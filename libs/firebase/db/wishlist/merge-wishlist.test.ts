import { CartItemFull } from '@/schemas/cart.schema';
import { mergeWishlist } from './merge-wishlist';

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
	{
		productId: 'id-1',
		skuId: 'skuId-2',
		quantity: 5,
		name: 'name-2',
		price: 50,
		image: 'imageUrl-2',
		color: 'red',
		size: 'xs',
		discount: undefined,
		sizes: undefined,
	},
];
describe('mergeWishlist', () => {
	it('should delete wishlist product to the array if wishlist item does not exists', () => {
		const existingItem = {
			productId: 'id-1',
			skuId: 'skuId-2',
			quantity: 1,
			name: 'name-2',
			price: 50,
			image: 'imageUrl-2',
			color: 'red',
			size: 'xs',
			discount: undefined,
			sizes: undefined,
		};
		const expectedCart = [products[0]];
		const shouldDeleteWishlistItem = true;
		expect(
			mergeWishlist(products, existingItem, shouldDeleteWishlistItem),
		).toStrictEqual(expectedCart);
	});

	it('should add wishlist item into wishlist array if wishlist item does not exists', () => {
		const newItem = {
			productId: 'id-1',
			skuId: 'skuId-3',
			quantity: 1,
			name: 'name-3',
			price: 50,
			image: 'imageUrl-2',
			color: 'red',
			size: 'xs',
			discount: undefined,
			sizes: undefined,
		};
		const expectedCart = [...products, newItem];

		expect(mergeWishlist(products, newItem)).toStrictEqual(expectedCart);
	});
});
