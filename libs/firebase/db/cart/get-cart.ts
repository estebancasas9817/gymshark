import { CartItem } from '@/types/cart';
import { db } from '../../firebase';
import { Variant } from '@/types/product';

export const getCart = async (userId: string) => {
	const cartSnap = await db.collection('carts').doc(userId).get();

	if (!cartSnap.exists) return [];

	const { items } = cartSnap.data() as {
		items: CartItem[];
	};

	const results = [];

	for (const item of items) {
		const productSnap = await db
			.collection('products')
			.doc(item.productId)
			.get();

		const product = productSnap.data();
		if (!productSnap.exists || !product) continue;

		const variant = product.variants.find(
			(v: Variant) => v.id === item.variantId,
		);

		if (!variant) continue;

		results.push({
			productId: item.productId,
			variantId: item.variantId,
			quantity: item.quantity,
			name: product.name,
			price: product.price,
			image: variant.images[0],
			color: variant.color,
			size: variant.size,
		});
	}

	return results;
};
