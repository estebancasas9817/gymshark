import { CartItemFull } from '@/schemas/cart.schema';
import { db } from '../../init-firestore';

export const verifyAnonymousCartPrices = async (
	items: CartItemFull[],
): Promise<CartItemFull[]> => {
	const productPromises = items.map((item) =>
		db.collection('products').doc(item.productId).get(),
	);
	const skuPromises = items.map((item) =>
		db
			.collection('products')
			.doc(item.productId)
			.collection('skus')
			.doc(item.skuId)
			.get(),
	);

	const [productSnaps, skuSnaps] = await Promise.all([
		Promise.all(productPromises),
		Promise.all(skuPromises),
	]);

	return items.map((item, index) => ({
		...item,
		price:
			skuSnaps[index].data()?.price ??
			productSnaps[index].data()?.basePrice ??
			item.price,
	}));
};
