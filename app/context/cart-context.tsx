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
import { addToCartAction, deleteCartAction } from '../actions/actions';
import { setItemsInLocalStorage } from '@/utils/local-storage/set-items';
import { useSession } from 'next-auth/react';
import { CartItemFull } from '@/libs/firebase/db/cart/get-cart';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { useRouter } from 'next/navigation';
import { mergeCart } from '@/libs/firebase/db/cart/merge-cart';
import { deleteItemsInLocalStorage } from '@/utils/local-storage/delete-items';

type Context = {
	handleAddToCart: ({
		quantity,
		productId,
		size,
		skuId,
		name,
		color,
		image,
		price,
	}: CartItemFull) => Promise<void>;
	handleDecreaseCartQuantity: ({
		quantity,
		productId,
		size,
		skuId,
		name,
		color,
		image,
		price,
	}: CartItemFull) => Promise<void>;
	optimisticState: CartItemFull[] | [];
	handleOpenDrawer: () => void;
	handleCloseDrawer: () => void;
	isDrawerOpen: boolean;
	isPending: boolean;
};

type NewItem = CartItemFull & {
	shouldDecreaseQuantity?: boolean;
};

const CartContext = createContext<Context | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const session = useSession();
	const [optimisticState, setOptimisticState] = useState<CartItemFull[] | []>(
		[],
	);
	const [cartVersion, setCartVersion] = useState<number>(0);
	const [isPending, startTransition] = useTransition();
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	const user = session.data?.user?.email;

	useEffect(() => {
		// * MERGE CART FROM LOCAL STORAGE WITH CART FROM DB
		const addToCart = async (items: CartItemFull[]) => {
			const { status } = await addToCartAction(items);
			if (status === 200) {
				deleteItemsInLocalStorage('cart');
			} else if (status === 401) {
				router.push('/sign-in');
			}
		};

		const localStorageCartItems = getItemsFromLocalStorage<
			CartItemFull[] | null
		>('cart');
		if (user && localStorageCartItems) {
			addToCart(localStorageCartItems);
		}
	}, [user, router]);

	useEffect(() => {
		// * FETCH GET-CART ON FIRST CALL OR WHEN ADD-TO-CART FAILS
		const getCart = async () => {
			const res = await fetch('/api/cart');
			const { success = false, data, status } = await res.json();
			if (success) {
				setOptimisticState(data);
			} else if (status === 401) {
				// * IF 401, meaning the session in the server expires, but in the client hasn't.
				router.push('/sign-in');
			}
		};
		if (user) {
			getCart();
		} else {
			const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
			if (data) {
				setOptimisticState(data);
			}
		}
	}, [user, router, setOptimisticState, cartVersion]);

	const handleOpenDrawer = useCallback(() => {
		setIsDrawerOpen(true);
	}, [isDrawerOpen, setIsDrawerOpen]);

	const handleCloseDrawer = useCallback(() => {
		setIsDrawerOpen(false);
	}, [isDrawerOpen, setIsDrawerOpen]);

	const handleDecreaseCartQuantity = useCallback(
		async (rest: CartItemFull) => {
			if (user) {
				const optimisticCart = mergeCart(optimisticState, {
					...rest,
					shouldDecreaseQuantity: true,
				});
				startTransition(async () => {
					const { status } = await deleteCartAction({
						...rest,
					});
					if (status === 200) {
						// * IF we could delete the cart in the DB, or if there was an error, then we update the cart version, so that the optimisticState can be updated
						setOptimisticState(optimisticCart);
					} else if (status === 500) {
						setCartVersion((prev) => prev + 1);
					} else {
						// * IF 401, meaning the session in the server expires, but in the client hasn't.
						router.push('/sign-in');
					}
				});
			} else {
				const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const optimisticCart = mergeCart(data, {
						...rest,
						shouldDecreaseQuantity: true,
					});
					setItemsInLocalStorage('cart', optimisticCart);
					setOptimisticState(optimisticCart);
				}
			}
		},
		[user, router, optimisticState, setOptimisticState],
	);

	const handleAddToCart = useCallback(
		async (rest: CartItemFull) => {
			if (user) {
				const optimisticCartData = mergeCart(optimisticState, rest);
				startTransition(async () => {
					const { status } = await addToCartAction({
						...rest,
					});
					if (status === 200) {
						// * IF we could add the cart in the DB, or if there was an error, then we update the cart version, so that the optimisticState can be updated
						handleOpenDrawer();
						setOptimisticState(optimisticCartData);
					} else if (status === 500) {
						setCartVersion((prev) => prev + 1);
					} else {
						// * IF 401, meaning the session in the server expires, but in the client hasn't.
						router.push('/sign-in');
					}
				});
			} else {
				const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const updatedCart = mergeCart(data, rest);
					setItemsInLocalStorage('cart', updatedCart);
					setOptimisticState(updatedCart);
				} else {
					// * IF IT'S THE FIRST ITEM THE USER ADDS
					const updatedCart = [rest];
					setItemsInLocalStorage('cart', updatedCart);
					setOptimisticState(updatedCart);
				}
				handleOpenDrawer();
			}
		},
		[user, router, optimisticState, setOptimisticState],
	);

	const value = useMemo(
		() => ({
			handleAddToCart,
			optimisticState,
			handleOpenDrawer,
			handleCloseDrawer,
			isDrawerOpen,
			isPending,
			handleDecreaseCartQuantity,
		}),
		[
			handleAddToCart,
			optimisticState,
			handleCloseDrawer,
			handleOpenDrawer,
			isDrawerOpen,
			isPending,
			handleDecreaseCartQuantity,
		],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error(
			'You need to wrap the provider in order to use the context',
		);
	}
	return context;
};
