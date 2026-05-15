import { Product, Sku } from '@/types/product';
import { CategoryBehavior } from '@/types/category';
import { db } from '../../firebase';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { PAGE_SIZE } from '@/app/(public)/[category]/[subCategory]/constants/constants';
import { getSkusForProducts } from './get-skus-for-products';
import { capitalize } from '@/utils/capitalize/capitalize';

type GetProductByCategoryProps = {
	behavior: CategoryBehavior;
	id: string;
	page: number;
	color: string | undefined;
	size: string | undefined;
};

type ProductCard = Product & {
	skus: Sku;
};

export const _getProductsByCategory = async ({
	id,
	behavior,
	page,
	color,
	size,
}: GetProductByCategoryProps): Promise<{
	products: ProductCard[];
}> => {
	const [categorySlug, subcategorySlug] = id.includes('-')
		? id.split('-')
		: [id, null];

	let query: FirebaseFirestore.Query = db.collection('products');

	if (behavior === 'expand') {
		query = query.where('categorySlug', '==', categorySlug);
	} else {
		query = query.where('subcategorySlug', '==', subcategorySlug);
	}

	query = query.orderBy('sortIndex');

	if (size) {
		query = query.where('availableSizes', 'array-contains', size);
	}

	if (color) {
		const normalizedColor = color ? capitalize(color) : 'Black';
		query = query.where('availableColors', 'array-contains', normalizedColor);
	}

	const start = (page - 1) * PAGE_SIZE + 1;
	const end = page * PAGE_SIZE;

	query = query.startAt(start).endAt(end);

	const snapshot = await query.get();

	const products = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));

	const productIds = products.map((p) => p.id);
	console.log('[productIds]', { productIds, products });
	const skusByProduct: Sku[] = await getSkusForProducts(productIds, color);
	const finalProducts = products.map((product, index) => ({
		...product,
		skus: skusByProduct[index] ?? [],
	}));

	return { products: finalProducts };
};

export const getProductsByCategory = cache(
	async (props: GetProductByCategoryProps) => {
		const cachedFn = unstable_cache(
			() => _getProductsByCategory(props),
			[
				'products-by-category',
				props.id,
				props.behavior,
				props.page.toString(),
				props.color ?? '',
				props.size ?? '',
			],
			{
				revalidate: 60 * 60,
				tags: ['products'],
			},
		);

		return cachedFn();
	},
);
