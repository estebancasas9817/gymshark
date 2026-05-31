import { CartItem } from '@/types/cart';

export const mergeCart = <
	T extends { skuId: string; size: string; quantity: number },
>(
	currentCart: T[],
	newItem: T,
): T[] => {
	const exists = currentCart.find(
		(item) => item.skuId === newItem.skuId && item.size === newItem.size,
	);
	if (exists) {
		return currentCart.map((item) =>
			item.skuId === newItem.skuId && item.size === newItem.size
				? { ...item, quantity: item.quantity + newItem.quantity }
				: item,
		);
	}
	return [...currentCart, newItem];
};

export const mergeCartItems = (
	currentCart: CartItem[],
	newItems: CartItem[],
) => {
	return newItems.reduce((acc, item) => mergeCart(acc, item), currentCart);
};
