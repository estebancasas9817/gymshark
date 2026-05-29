'use client';

import {
	createContext,
	ReactNode,
	startTransition,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useOptimistic,
	useState,
} from 'react';
import { addToCartAction } from '../actions/actions';
import { setItemsInLocalStorage } from '@/utils/local-storage/set-items';
import { useSession } from 'next-auth/react';
import { CartItemFull } from '@/libs/firebase/db/cart/get-cart';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { useRouter } from 'next/navigation';

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
	optimisticState: CartItemFull[] | [];
};

const CartContext = createContext<Context | null>(null);

const updateOptimistic = (
	currentCart: CartItemFull[] | [],
	newItem: CartItemFull,
) => {
	const exists = currentCart.find(
		(item) => item.skuId === newItem.skuId && item.size === newItem.size,
	);
	if (exists) {
		return currentCart.map((item) =>
			item.skuId === newItem.skuId && item.size === newItem.size
				? { ...item, quantity: item.quantity + 1 }
				: item,
		);
	}
	return [...currentCart, newItem];
};
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const session = useSession();
	const [cartData, setCartData] = useState<CartItemFull[] | []>([]);
	const [cartVersion, setCartVersion] = useState<number>(0);
	const [optimisticState, addOptimistic] = useOptimistic(
		cartData,
		updateOptimistic,
	);
	const userId = session.data?.user?.id;

	useEffect(() => {
		const getCart = async () => {
			const res = await fetch('/api/cart');
			const { success = false, data } = await res.json();
			if (success) {
				setCartData(data);
			}
		};
		if (userId) {
			getCart();
		} else {
			const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
			if (data) {
				setCartData(data);
			}
		}
	}, [userId, cartVersion]);

	const handleAddToCart = useCallback(
		async (rest: CartItemFull) => {
			if (userId) {
				startTransition(() => {
					addOptimistic({
						...rest,
					});
				});
				const { status } = await addToCartAction({
					...rest,
				});
				if (status === 200 || status === 500) {
					// * IF we could add the cart in the DB, or if there was an error, then we update the cart version, so that the optimisticState can be updated

					setCartVersion((prev) => prev + 1);
				} else {
					// * IF 401, meaning the session in the server expires, but in the client don't.
					router.push('/sign-in');
				}
			} else {
				const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
				if (data) {
					// * IF USER ALREADY HAVE ITEMS IN LOCAL STORAGE
					const updatedCart = updateOptimistic(data, rest);
					setItemsInLocalStorage('cart', updateOptimistic(data, rest));
					setCartData(updatedCart);
				} else {
					// * IF IT'S THE FIRST ITEM THE USER ADDS
					const updatedCart = [rest];
					setItemsInLocalStorage('cart', updatedCart);
					setCartData(updatedCart);
				}
			}
		},
		[userId, router],
	);

	const value = useMemo(
		() => ({ handleAddToCart, optimisticState }),
		[handleAddToCart, optimisticState],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
