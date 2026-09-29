import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { db } from '@/libs/firebase/init-firestore';
import { Product, Sku } from '@/types/product';

export const getProductCached = (productSlug: string, color: string) =>
	unstable_cache(
		async () => {
			const snapshot = await db
				.collection('products')
				.where('id', '==', productSlug)
				.limit(1)
				.get();

			if (snapshot.empty) return null;

			const doc = snapshot.docs[0];

			const product = {
				id: doc.id,
				...(doc.data() as Omit<Product, 'id'>),
			};

			const skusSnap = await db
				.collection('products')
				.doc(doc.id)
				.collection('skus')
				.get();

			if (skusSnap.empty) return null;

			const skus = skusSnap.docs.map(
				(skuDoc) => ({ id: skuDoc.id, ...skuDoc.data() }) as Sku,
			);

			const normalizedColor = color?.toLowerCase();

			const sku =
				skus.find((sku) => sku.color.toLowerCase() === normalizedColor) ??
				skus.find((sku) => sku.isDefault) ??
				skus[0];

			return {
				...product,
				sku,
				skus,
				href: `/product${product.slug}`,
			};
		},
		['product', productSlug, color],
		{
			revalidate: 3600,
			tags: ['products', `product-${productSlug}`],
		},
	)();

export const getProduct = cache(
	async (
		productSlug: string,
		color: string,
	): Promise<(Product & { sku: Sku; skus: Sku[]; href: string }) | null> => {
		return getProductCached(productSlug, color);
	},
);
