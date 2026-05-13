import { Product } from '@/types/product';
import { CategoryBehavior } from '@/types/category';
import { db } from '../../firebase';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

type GetProductByCategoryProps = {
	behavior: CategoryBehavior;
	id: string;
	cursor?: number | null;
};

export const _getProductsByCategory = async ({
	id,
	behavior,
	cursor,
}: GetProductByCategoryProps): Promise<{
	products: Product[];
	nextCursor: number | null;
}> => {
	const PAGE_SIZE = 12;

	let query: FirebaseFirestore.Query = db
		.collection('products')
		.orderBy('sortIndex', 'asc')
		.limit(PAGE_SIZE);

	if (behavior === 'expand') {
		const [categorySlug, subcategorySlug] = id.split('-');

		query = query
			.where('categorySlug', '==', categorySlug)
			.where('subcategorySlug', '==', subcategorySlug);
	} else {
		query = query.where('categorySlug', '==', id);
	}

	if (cursor) {
		query = query.startAfter(cursor);
	}

	const snapshot = await query.get();

	const products = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));

	const lastDoc = snapshot.docs[snapshot.docs.length - 1];

	const nextCursor = lastDoc?.data().sortIndex ?? null;

	return {
		products,
		nextCursor,
	};
};

export const getProductsByCategory = cache(
	async (props: GetProductByCategoryProps) => {
		const cachedFn = unstable_cache(
			() => _getProductsByCategory(props),
			[
				'products-by-category',
				props.id,
				props.behavior,
				props.cursor?.toString() ?? '',
			],
			{
				revalidate: 60 * 60,
				tags: ['products'],
			},
		);

		return cachedFn();
	},
);
