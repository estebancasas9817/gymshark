import { unstable_cache } from 'next/cache';
import { db } from '../../init-firestore';
import { Product } from '@/types/product';

export const getWeRecommend = (
	categorySlug: string,
	excludeProductId: string,
): Promise<Product[]> => {
	return unstable_cache(
		async () => {
			const snap = await db
				.collection('products')
				.where('categorySlug', '==', categorySlug)
				.where('isActive', '==', true)
				.limit(9) // 9 para tener margen al excluir el producto actual
				.get();

			if (snap.empty) return [];

			return snap.docs
				.filter((doc) => doc.id !== excludeProductId)
				.slice(0, 8)
				.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) }));
		},
		['we-recommend', categorySlug, excludeProductId],
		{ tags: [`we-recommend-${categorySlug}`] },
	)();
};
