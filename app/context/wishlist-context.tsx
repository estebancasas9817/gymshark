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
import { mergeWishlist } from '@/libs/firebase/db/wishlist/merge-wishlist';
import {
	GetWishlistSchema,
	WishlistItemFull,
	WishlistItemFullArraySchema,
	WishlistItemsFull,
} from '@/schemas/wishlist.schema';

type Context = {
	handleAddToWishlist: ({
		productId,
		skuId,
		name,
		color,
		image,
		price,
		sizes,
		discount,
	}: WishlistItemFull) => Promise<void>;
	handleDeleteWishlist: ({
		productId,
		skuId,
		name,
		color,
		image,
		price,
		sizes,
		discount,
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
			const json = await res.json();
			const wishListRes = GetWishlistSchema.safeParse(json);
			if (wishListRes.success && wishListRes.data.status === 'SUCCESS') {
				setOptimisticState(wishListRes.data.data);
			} else if (
				wishListRes.success &&
				wishListRes.data.status === 'UNAUTHORIZED'
			) {
				// * IF 401, meaning the session in the server expires, but in the client hasn't.
				router.push('/sign-in');
			}
		};

		// * MERGE WISHLIST FROM LOCAL STORAGE WITH WISHLIST FROM DB
		const addToWishlist = async (items: WishlistItemsFull) => {
			const { status } = await addToWishlistAction(items);
			if (status === 200) {
				deleteItemsInLocalStorage('wishlist');
			} else if (status === 401) {
				router.push('/sign-in');
			}
		};
		const res = getItemsFromLocalStorage<WishlistItemsFull | null>('wishlist');
		const localStorageWishlistItems =
			WishlistItemFullArraySchema.safeParse(res);

		const init = async () => {
			if (user) {
				if (localStorageWishlistItems.success) {
					await addToWishlist(localStorageWishlistItems.data);
				}
				await getWishlist();
			} else {
				const res = getItemsFromLocalStorage<WishlistItemsFull | null>(
					'wishlist',
				);
				const localStorageWishlistItems =
					WishlistItemFullArraySchema.safeParse(res);
				if (localStorageWishlistItems.success) {
					setOptimisticState(localStorageWishlistItems.data);
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
				const res = getItemsFromLocalStorage<WishlistItemsFull | null>(
					'wishlist',
				);
				const localStorageWishlistItems =
					WishlistItemFullArraySchema.safeParse(res);
				if (localStorageWishlistItems.success) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const optimisticWishlist = mergeWishlist(
						localStorageWishlistItems.data,
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
				const res = getItemsFromLocalStorage<WishlistItemsFull | null>(
					'wishlist',
				);
				const localStorageWishlistItems =
					WishlistItemFullArraySchema.safeParse(res);
				if (localStorageWishlistItems.success) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const updatedWishlist = mergeWishlist(
						localStorageWishlistItems.data,
						rest,
					);
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
