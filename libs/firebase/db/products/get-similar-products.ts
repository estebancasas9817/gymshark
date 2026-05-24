import type { Product } from '@/types/product';
import { db } from '../../init-firestore';

export const getSimilarProducts = async (
	productId: string,
	parentCategoryId: string,
): Promise<Product[]> => {
	const snapshot = await db
		.collection('products')
		.where('parentCategoryId', '==', parentCategoryId)
		.limit(12)
		.get();

	const products: Product[] = [];
	console.log('[object]', productId, parentCategoryId);
	snapshot.forEach((doc) => {
		console.log('object');
		if (doc.id === productId) return;

		const data = doc.data();

		products.push({
			id: doc.id,
			...(data as Omit<Product, 'id'>),
		});
	});

	return products.slice(0, 8);
};
