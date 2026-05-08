import { Product } from '@/types/product';
import { CategoryBehavior } from '@/types/category';
import { db } from '../../firebase';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

type GetProductByCategoryProps = {
	behavior: CategoryBehavior;
	id: string;
	page: number;
};

const _getProductsByCategory = async ({
	id,
	behavior,
	page,
}: GetProductByCategoryProps): Promise<Product[]> => {
	const limit = page * 14;
	if (behavior === 'expand') {
		const [categorySlug, subcategorySlug] = id.split('-');
		const snapshot = await db
			.collection('products')
			.where('categorySlug', '==', categorySlug)
			.where('subcategorySlug', '==', subcategorySlug)
			.limit(limit)
			.get();

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Product, 'id'>),
		}));
	}
	const snapshot = await db
		.collection('products')
		.where('categorySlug', '==', id)
		.limit(limit)
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));
};

export const getProductsByCategory = cache(
	async (props: GetProductByCategoryProps) => {
		const cachedFn = unstable_cache(
			() => _getProductsByCategory(props),
			['products-by-category', props.id, props.behavior ?? 'normal'],
			{
				revalidate: 60 * 60,
				tags: ['products'],
			},
		);

		return cachedFn();
	},
);
