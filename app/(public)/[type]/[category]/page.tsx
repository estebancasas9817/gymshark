import { getCategoryBySlug } from '@/libs/firebase/db/categories';
import { getProductsByCategory } from '@/libs/firebase/db/get-products-by-category';
import { seedCategories } from '@/libs/firebase/db/seed';
import { PageProps } from '@/types/next';
import { notFound } from 'next/navigation';

type RouteParams = { category: string; type: string };
// TODO: update searchParams
type QueryParams = { color?: string; size?: string };

export default async function Page({
	params,
}: PageProps<RouteParams, QueryParams>) {
	const { category, type } = await params;
	const slug = `${type}/${category}`;
	const categoryData = await getCategoryBySlug(slug);
	if (!categoryData) {
		notFound();
	}
	const { id } = categoryData;
	const products = await getProductsByCategory(id);
	return <div>Categories Page</div>;
}
