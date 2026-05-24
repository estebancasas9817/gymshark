import { Product, Sku } from '@/types/product';
import { db } from '../../init-firestore';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { PAGE_SIZE } from '@/app/(public)/[category]/[subCategory]/constants/constants';
import { getSkusForProducts } from './get-skus-for-products';
import { getCategoryBySlug } from '../categories/categories';
import {
	Color,
	Size,
	SortBy,
} from '@/app/(public)/[category]/[subCategory]/types/product-list-types';
import { normalizeColor, SIZE_MAP, splitSlug } from './utils';

type GetProductByCategoryProps = {
	page: number;
	color?: Color;
	size?: Size;
	slug: string;
	sortBy: SortBy;
	price?: string;
	pageSize: number;
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
	price,
	pageSize,
}: GetProductByCategoryProps): Promise<{
	products: ProductCard[];
}> => {
	const { id, behavior } = await getCategoryBySlug(slug);
	const [categorySlug, subcategorySlug] = splitSlug(id);
	let query: FirebaseFirestore.Query = db.collection('products');

	//* filtering only active products (with stock)
	query = query
		.where('isActive', '==', true)
		.where('categorySlug', '==', categorySlug);

	if (behavior === 'exact') {
		query = query.where('subcategorySlug', '==', subcategorySlug);
	}

	//* SORT FILTERING + pricing filtering
	if (sortBy === 'high_to_low') {
		query = query.orderBy('basePrice', 'desc');
	} else if (sortBy === 'low_to_high' || price) {
		query = query.orderBy('basePrice', 'asc');
	} else {
		query = query.orderBy('sortIndex');
	}

	//* PRICE FILTERING
	if (price) {
		const [min, max] = price.split('_');
		query = query.where('basePrice', '>=', +min).where('basePrice', '<=', +max);
	}

	//* COLOR & SIZE FILTERING
	if (color && size) {
		const normalizedSize = SIZE_MAP[size.toLowerCase()] ?? size;
		query = query.where(
			'variants',
			'array-contains',
			`${color.toUpperCase()}-${normalizedSize.toUpperCase()}`,
		);
	} else if (size) {
		const normalizedSize = SIZE_MAP[size.toLowerCase()] ?? size;
		query = query.where('availableSizes', 'array-contains', normalizedSize);
	} else if (color) {
		query = query.where(
			'availableColors',
			'array-contains',
			normalizeColor(color),
		);
	}

	query = query.limit(pageSize).offset((page - 1) * pageSize);

	const snapshot = await query.get();

	if (snapshot.empty) return { products: [] };

	const products = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));

	const productIds = products.map((p) => p.id);

	// Getting SKUS for rendering photos and sizes
	const skusByProductId = await getSkusForProducts(productIds, color, size);
	const finalProducts = products
		.filter((product) => !!skusByProductId[product.id])
		.map((product) => ({
			...product,
			skus: (skusByProductId[product.id] as Sku) ?? {},
			href: `/product${product.slug}`,
		}))
		.filter((product) => product.skus !== undefined); // safety net

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
				props.price ?? '',
				props.pageSize.toString(),
			],
			{
				revalidate: 60 * 60,
				tags: ['products'],
			},
		);

		return cachedFn();
	},
);
