'use client';

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from 'react';
import { addToWishlistAction, deleteWishlistAction } from '../actions/actions';
import { setItemsInLocalStorage } from '@/utils/local-storage/set-items';
import { useSession } from 'next-auth/react';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { useRouter } from 'next/navigation';
import { deleteItemsInLocalStorage } from '@/utils/local-storage/delete-items';
import { WishlistItemFull } from '@/libs/firebase/db/wishlist/get-wishlist';
import { mergeWishlist } from '@/libs/firebase/db/wishlist/merge-wishlist';

type Context = {
	handleAddToWishlist: ({
		productId,
		skuId,
		name,
		color,
		image,
		price,
		sizes,
	}: WishlistItemFull) => Promise<void>;
	handleDeleteWishlist: ({
		productId,
		skuId,
		name,
		color,
		image,
		price,
		sizes,
	}: WishlistItemFull) => Promise<void>;
	optimisticState: WishlistItemFull[] | [];
	isPending: boolean;
};

const WishlistContext = createContext<Context | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const session = useSession();
	const [optimisticState, setOptimisticState] = useState<
		WishlistItemFull[] | []
	>([]);
	const [wishlistVersion, setwishlistVersion] = useState<number>(0);
	const [isPending, startTransition] = useTransition();

	const user = session.data?.user?.id;

	useEffect(() => {
		// * FETCH GET-WISHLIST ON FIRST CALL OR WHEN ADD-TO-WISHLIST FAILS
		const getWishlist = async () => {
			const res = await fetch('/api/wishlist');
			const { success = false, data, status } = await res.json();
			if (success) {
				setOptimisticState(data);
			} else if (status === 401) {
				// * IF 401, meaning the session in the server expires, but in the client hasn't.
				router.push('/sign-in');
			}
		};

		// * MERGE WISHLIST FROM LOCAL STORAGE WITH WISHLIST FROM DB
		const addToWishlist = async (items: WishlistItemFull[]) => {
			const { status } = await addToWishlistAction(items);
			if (status === 200) {
				deleteItemsInLocalStorage('wishlist');
			} else if (status === 401) {
				router.push('/sign-in');
			}
		};
		const localStorageWishlistItems = getItemsFromLocalStorage<
			WishlistItemFull[] | null
		>('wishlist');

		const init = async () => {
			if (user) {
				if (localStorageWishlistItems) {
					await addToWishlist(localStorageWishlistItems);
				}
				await getWishlist();
			} else {
				const data = getItemsFromLocalStorage<WishlistItemFull[]>('wishlist');
				if (data) {
					setOptimisticState(data);
				}
			}
		};
		init();
	}, [user, router, setOptimisticState, wishlistVersion]);

	const handleDeleteWishlist = useCallback(
		async (rest: WishlistItemFull) => {
			if (user) {
				const optimisticWishlist = mergeWishlist(
					optimisticState,
					{
						...rest,
					},
					true,
				);
				setOptimisticState(optimisticWishlist);

				startTransition(async () => {
					const { status } = await deleteWishlistAction({
						...rest,
					});
					if (status === 500) {
						setwishlistVersion((prev) => prev + 1);
					} else if (status === 401) {
						// * The session in the server expires, but in the client hasn't.
						router.push('/sign-in');
					}
				});
			} else {
				const data = getItemsFromLocalStorage<WishlistItemFull[]>('wishlist');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const optimisticWishlist = mergeWishlist(
						data,
						{
							...rest,
						},
						true,
					);
					setItemsInLocalStorage('wishlist', optimisticWishlist);
					setOptimisticState(optimisticWishlist);
				}
			}
		},
		[user, router, optimisticState, setOptimisticState],
	);

	const handleAddToWishlist = useCallback(
		async (rest: WishlistItemFull) => {
			if (user) {
				const optimisticWishlistData = mergeWishlist(optimisticState, rest);
				setOptimisticState(optimisticWishlistData);

				startTransition(async () => {
					const { status } = await addToWishlistAction({
						...rest,
					});
					if (status === 500) {
						setwishlistVersion((prev) => prev + 1);
					} else if (status === 401) {
						// * IF 401, meaning the session in the server expires, but in the client hasn't.
						router.push('/sign-in');
					}
				});
			} else {
				const data = getItemsFromLocalStorage<WishlistItemFull[]>('wishlist');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const updatedWishlist = mergeWishlist(data, rest);
					setItemsInLocalStorage('wishlist', updatedWishlist);
					setOptimisticState(updatedWishlist);
				} else {
					// * IF IT'S THE FIRST ITEM THE USER ADDS
					const updatedWishlist = [rest];
					setItemsInLocalStorage('wishlist', updatedWishlist);
					setOptimisticState(updatedWishlist);
				}
			}
		},
		[user, router, optimisticState, setOptimisticState],
	);

	const value = useMemo(
		() => ({
			handleAddToWishlist,
			optimisticState,
			isPending,
			handleDeleteWishlist,
		}),
		[handleAddToWishlist, optimisticState, isPending, handleDeleteWishlist],
	);

	return (
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlist = () => {
	const context = useContext(WishlistContext);
	if (!context) {
		throw new Error(
			'You need to wrap the provider in order to use the context',
		);
	}
	return context;
};
