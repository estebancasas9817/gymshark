import { Product, Sku } from '@/types/product';
import { db } from '../../firebase';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { PAGE_SIZE } from '@/app/(public)/[category]/[subCategory]/constants/constants';
import { getSkusForProducts } from './get-skus-for-products';
import { capitalize } from '@/utils/capitalize/capitalize';
import { getCategoryBySlug } from '../categories/categories';

type GetProductByCategoryProps = {
	page: number;
	color: string | undefined;
	size: string | undefined;
	slug: string;
};

type ProductCard = Product & {
	skus: Sku;
	href: string;
};

export const _getProductsByCategory = async ({
	page,
	color,
	size,
	slug,
}: GetProductByCategoryProps): Promise<{
	products: ProductCard[];
}> => {
	const { id, behavior } = await getCategoryBySlug(slug);
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

	query = query.limit(PAGE_SIZE).offset((page - 1) * PAGE_SIZE);

	const snapshot = await query.get();

	const products = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));

	const productIds = products.map((p) => p.id);
	const skusByProduct: Sku[] = await getSkusForProducts(productIds, color);
	const finalProducts = products.map((product, index) => ({
		...product,
		skus: skusByProduct[index] ?? {},
		href: `/product${product.slug}`,
	}));

	return { products: finalProducts };
};

export const getProductsByCategory = cache(
	async (props: GetProductByCategoryProps) => {
		const cachedFn = unstable_cache(
			() => _getProductsByCategory(props),
			[
				'products-by-category',
				props.slug,
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
