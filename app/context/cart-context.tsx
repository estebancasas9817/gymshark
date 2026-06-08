'use client';

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useOptimistic,
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

export const mergeCartOptimistic = (
	currentCart: CartItemFull[],
	newItem: NewItem,
): CartItemFull[] => mergeCart(currentCart, newItem);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const session = useSession();
	const [cartData, setCartData] = useState<CartItemFull[] | []>([]);
	const [cartVersion, setCartVersion] = useState<number>(0);
	const [optimisticState, addOptimistic] = useOptimistic(
		cartData,
		mergeCartOptimistic,
	);
	const [isPending, startTransition] = useTransition();
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	const user = session.data?.user?.email;

	useEffect(() => {
		const getCart = async () => {
			const res = await fetch('/api/cart');
			const { success = false, data, status } = await res.json();
			if (success) {
				setCartData(data);
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
				setCartData(data);
			}
		}
	}, [user, cartVersion, router]);

	const handleOpenDrawer = useCallback(() => {
		setIsDrawerOpen(true);
	}, [isDrawerOpen, setIsDrawerOpen]);

	const handleCloseDrawer = useCallback(() => {
		setIsDrawerOpen(false);
	}, [isDrawerOpen, setIsDrawerOpen]);

	const handleDecreaseCartQuantity = useCallback(
		async (rest: CartItemFull) => {
			if (user) {
				startTransition(() => {
					addOptimistic({
						...rest,
						shouldDecreaseQuantity: true,
					});
				});
				const { status } = await deleteCartAction({
					...rest,
				});
				if (status === 200) {
					// * IF we could delete the cart in the DB, or if there was an error, then we update the cart version, so that the optimisticState can be updated
					setCartVersion((prev) => prev + 1);
				} else if (status === 500) {
					setCartVersion((prev) => prev + 1);
				} else {
					// * IF 401, meaning the session in the server expires, but in the client hasn't.
					router.push('/sign-in');
				}
			} else {
				const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const updatedCart = mergeCart(data, {
						...rest,
						shouldDecreaseQuantity: true,
					});
					setItemsInLocalStorage('cart', updatedCart);
					setCartData(updatedCart);
				}
			}
		},
		[user, router],
	);

	const handleAddToCart = useCallback(
		async (rest: CartItemFull) => {
			if (user) {
				startTransition(() => {
					addOptimistic({
						...rest,
					});
				});
				const { status } = await addToCartAction({
					...rest,
				});
				if (status === 200) {
					// * IF we could add the cart in the DB, or if there was an error, then we update the cart version, so that the optimisticState can be updated
					handleOpenDrawer();
					setCartVersion((prev) => prev + 1);
				} else if (status === 500) {
					setCartVersion((prev) => prev + 1);
				} else {
					// * IF 401, meaning the session in the server expires, but in the client hasn't.
					router.push('/sign-in');
				}
			} else {
				const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const updatedCart = mergeCart(data, rest);
					setItemsInLocalStorage('cart', updatedCart);
					setCartData(updatedCart);
				} else {
					// * IF IT'S THE FIRST ITEM THE USER ADDS
					const updatedCart = [rest];
					setItemsInLocalStorage('cart', updatedCart);
					setCartData(updatedCart);
				}
				handleOpenDrawer();
			}
		},
		[user, router],
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
