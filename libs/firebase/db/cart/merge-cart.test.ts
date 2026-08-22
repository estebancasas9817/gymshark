import { CartItemFull } from '@/schemas/cart.schema';
import { mergeCart } from './merge-cart';

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
describe('merge-cart', () => {
	it('should increase quantity of item if item already exists and shouldDecreaseQuantity is false', () => {
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
		const expectedCart = [products[0], { ...existingItem, quantity: 6 }];

		expect(mergeCart(products, existingItem)).toStrictEqual(expectedCart);
	});

	it('should decrease quantity of item if item already exists and shouldDecreaseQuantity is true', () => {
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
			shouldDecreaseQuantity: true,
		};
		const expectedCart = [
			products[0],
			{
				...products[1],
				quantity: 4,
			},
		];

		expect(mergeCart(products, existingItem)).toStrictEqual(expectedCart);
	});

	it('should add the item to the cart if the item is does not exists ', () => {
		const newItem = {
			productId: 'id-3',
			skuId: 'skuId-3',
			quantity: 1,
			name: 'name-2',
			price: 50,
			image: 'imageUrl-2',
			color: 'red',
			size: 'xs',
			discount: undefined,
			sizes: undefined,
			shouldDecreaseQuantity: true,
		};
		const expectedCart = [...products, newItem];

		expect(mergeCart(products, newItem)).toStrictEqual(expectedCart);
	});
});
