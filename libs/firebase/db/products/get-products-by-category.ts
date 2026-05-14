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
const PAGE_SIZE = 12;

export const _getProductsByCategory = async ({
	id,
	behavior,
	page,
}: GetProductByCategoryProps): Promise<{
	products: Product[];
}> => {
	const [categorySlug, subcategorySlug] = id.includes('-')
		? id.split('-')
		: [id, null];

	let query: FirebaseFirestore.Query = db.collection('products');

	if (behavior === 'expand') {
		console.log('[entra]', subcategorySlug);

		query = query.where('categorySlug', '==', categorySlug);
	} else {
		console.log('[entra]', subcategorySlug);
		query = query.where('subcategorySlug', '==', subcategorySlug);
	}

	query = query.orderBy('sortIndex');

	const start = (page - 1) * PAGE_SIZE + 1;
	const end = page * PAGE_SIZE;

	query = query.startAt(start).endAt(end);

	const snapshot = await query.get();

	const products = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));

	return { products };
};

export const getProductsByCategory = cache(
	async (props: GetProductByCategoryProps) => {
		const cachedFn = unstable_cache(
			() => _getProductsByCategory(props),
			['products-by-category', props.id, props.behavior, props.page.toString()],
			{
				revalidate: 60 * 60,
				tags: ['products'],
			},
		);

		return cachedFn();
	},
);
