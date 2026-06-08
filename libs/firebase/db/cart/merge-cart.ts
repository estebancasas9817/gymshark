import { CartItem } from '@/types/cart';

export const mergeCart = <
	T extends {
		skuId: string;
		size: string;
		quantity: number;
		shouldDecreaseQuantity?: boolean;
	},
>(
	currentCart: T[],
	newItem: T,
): T[] => {
	const exists = currentCart.find(
		(item) => item.skuId === newItem.skuId && item.size === newItem.size,
	);
	if (exists) {
		return currentCart
			.map((item) => {
				if (item.skuId === newItem.skuId && item.size === newItem.size) {
					const quantity = newItem.shouldDecreaseQuantity
						? item.quantity - newItem.quantity
						: item.quantity + newItem.quantity;
					return { ...item, quantity };
				}
				return item;
			})
			.filter((item) => item.quantity !== 0);
	}
	return [...currentCart, newItem];
};

export const mergeCartItems = (
	currentCart: CartItem[],
	newItems: CartItem[],
) => {
	return newItems.reduce((acc, item) => mergeCart(acc, item), currentCart);
};
