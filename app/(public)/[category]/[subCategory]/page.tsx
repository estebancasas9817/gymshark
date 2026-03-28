import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { getProducts } from '@/libs/firebase/db/products/products';
import { seedCategories } from '@/libs/firebase/db/seed';
import { PageProps } from '@/types/next';
import { notFound } from 'next/navigation';

type RouteParams = { subCategory: string; category: string };
// TODO: update searchParams
type QueryParams = { color?: string; size?: string };

export default async function Page({
	params,
}: PageProps<RouteParams, QueryParams>) {
	const { subCategory, category } = await params;
	const slug = `${category}/${subCategory}`;
	// const categoryData = await getCategoryBySlug(slug);
	// if (!categoryData) {
	// 	notFound();
	// }
	// console.log('[categoryData]', categoryData);
	// const { id, parentId, behavior, name } = categoryData;

	// const products = await getProductsByCategory({ behavior, id });
	// await seedCategories();
	// console.log('[here]', { products });
	return <div>{'name'}</div>;
}
