import { Product } from '@/types/product';
import { unstable_cache } from 'next/cache';
import { db } from '../../init-firestore';

export const getYouMightLike = (
	categorySlug: string,
	excludeProductId: string,
): Promise<Product[]> => {
	const department = categorySlug.split('/')[0]; // 'women', 'men', 'accessories'

	return unstable_cache(
		async () => {
			const snap = await db
				.collection('products')
				.where('categorySlug', '!=', categorySlug)
				.where('isActive', '==', true)
				.limit(20)
				.get();

			if (snap.empty) return [];

			return snap.docs
				.filter(
					(doc) =>
						doc.id !== excludeProductId &&
						doc.data().categorySlug?.startsWith(department),
				)
				.slice(0, 8)
				.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) }));
		},
		['you-might-like', categorySlug, excludeProductId],
		{ tags: [`you-might-like-${categorySlug}`] },
	)();
};
