import { CartItemFull } from '@/schemas/cart.schema';
import { hasStock } from './utils';

const products: CartItemFull[] = [
	{
		productId: 'id',
		skuId: 'skuId',
		quantity: 1,
		name: 'name',
		price: 50,
		image: 'imageUrl',
		color: 'red',
		size: 'xs',
		discount: undefined,
		sizes: undefined,
	},
];

describe('utils', () => {
	describe('hasStock', () => {
		it('should return true if there is stock', () => {
			const sizes = [
				{ size: 'xs', stock: 50 },
				{ size: 's', stock: 50 },
				{ size: 'm', stock: 50 },
				{ size: 'l', stock: 50 },
			];
			const productsWithStock = [...products];
			productsWithStock[0].sizes = sizes;

			expect(hasStock(productsWithStock)).toBe(true);
		});
		it('should return false if there is no stock', () => {
			const sizes = [
				{ size: 'xs', stock: 0 },
				{ size: 's', stock: 0 },
				{ size: 'm', stock: 0 },
				{ size: 'l', stock: 0 },
			];
			const productsWithoutStock = [...products];
			productsWithoutStock[0].sizes = sizes;

			expect(hasStock(productsWithoutStock)).toBe(false);
		});
	});
});
