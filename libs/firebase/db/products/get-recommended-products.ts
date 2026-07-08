import { Product, Sku } from '@/types/product';
import { unstable_cache } from 'next/cache';
import { db } from '../../init-firestore';

type ProductWithSku = Product & { sku: Sku; href: string };

export const getWeRecommend = (
	categorySlug: string,
	excludeProductId: string,
): Promise<ProductWithSku[]> => {
	return unstable_cache(
		async () => {
			const snap = await db
				.collection('products')
				.where('categorySlug', '==', categorySlug)
				.where('isActive', '==', true)
				.limit(9)
				.get();

			if (snap.empty) return [];

			const filteredDocs = snap.docs
				.filter((doc) => doc.id !== excludeProductId)
				.slice(0, 8);

			const productsWithSkus = await Promise.all(
				filteredDocs.map(async (doc) => {
					const skusSnap = await db
						.collection('products')
						.doc(doc.id)
						.collection('skus')
						.where('isDefault', '==', true)
						.limit(1)
						.get();

					const sku = skusSnap.empty
						? null
						: ({ id: skusSnap.docs[0].id, ...skusSnap.docs[0].data() } as Sku);
					const product = doc.data();

					return {
						id: doc.id,
						...(product as Omit<Product, 'id'>),
						sku,
						href: `/product${product.slug}`,
					};
				}),
			);

			return productsWithSkus.filter(
				(p): p is ProductWithSku => p.sku !== null,
			);
		},
		['we-recommend', categorySlug, excludeProductId],
		{ tags: [`we-recommend-${categorySlug}`] },
	)();
};
