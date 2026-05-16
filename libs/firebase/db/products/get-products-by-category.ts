import { Product, Sku } from '@/types/product';
import { db } from '../../firebase';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { PAGE_SIZE } from '@/app/(public)/[category]/[subCategory]/constants/constants';
import { getSkusForProducts } from './get-skus-for-products';
import { capitalize } from '@/utils/capitalize/capitalize';
import { getCategoryBySlug } from '../categories/categories';
import {
	Color,
	Size,
	SortBy,
} from '@/app/(public)/[category]/[subCategory]/types/product-list-types';

type GetProductByCategoryProps = {
	page: number;
	color?: Color;
	size?: Size;
	slug: string;
	sortBy: SortBy;
};

type ProductCard = Product & {
	skus: Sku;
	href: string;
};

const _getProductsByCategory = async ({
	page,
	color,
	size,
	slug,
	sortBy,
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

	if (sortBy === 'low_to_high') {
		query = query.orderBy('basePrice', 'asc');
	} else if (sortBy === 'high_to_low') {
		query = query.orderBy('basePrice', 'desc');
	} else {
		query = query.orderBy('sortIndex'); // default
	}

	if (color && size) {
		query = query.where(
			'variants',
			'array-contains',
			`${color.toUpperCase()}-${size.toUpperCase()}`,
		);
	} else if (size) {
		const normalizedSize =
			size === 'One Size' ? capitalize(size) : size.toUpperCase();
		console.log('[size', normalizedSize);
		query = query.where('availableSizes', 'array-contains', normalizedSize);
	} else if (color) {
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
	const allSkus: Sku[] = await getSkusForProducts(productIds, color);
	const skusByProductId = allSkus.reduce(
		(acc, sku) => {
			acc[sku.productId] = sku;
			return acc;
		},
		{} as Record<string, Sku>,
	);
	const finalProducts = products.map((product) => ({
		...product,
		skus: skusByProductId[product.id] ?? {},
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
				props.sortBy ?? '',
			],
			{
				revalidate: 60 * 60,
				tags: ['products'],
			},
		);

		return cachedFn();
	},
);
