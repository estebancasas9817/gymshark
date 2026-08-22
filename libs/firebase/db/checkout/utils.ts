import { CartItemFull } from '@/schemas/cart.schema';

export const hasStock = (products: CartItemFull[]): boolean => {
	let hasProductStock = true;
	for (const product of products) {
		const stockPerSize =
			product.sizes?.find((item) => item.size === product.size)?.stock ?? 0;
		if (stockPerSize < product.quantity) {
			hasProductStock = false;
			break;
		}
	}
	return hasProductStock;
};
