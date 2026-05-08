import { Container } from '@/components/layout/container';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { PageProps } from '@/types/next';
import { ProductListHeader } from './components/product-list-header';
import { ProductListBody } from './components/product-list-body';

type RouteParams = {
	subCategory: string;
	category: 'women' | 'men' | 'accessories';
};
// TODO: update searchParams
type QueryParams = { color?: string; size?: string; page?: string };

export default async function Page(props: PageProps<RouteParams, QueryParams>) {
	// const params = await props.params;
	const [params, { page }] = await Promise.all([
		props.params,
		props.searchParams,
	]);
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;
	// const { id, behavior } = await getCategoryBySlug(slug);
	// const products = await getProductsByCategory({ behavior, id });
	// console.log('[here]', { products });
	return (
		<Container as="main">
			<ProductListHeader />
			<ProductListBody params={params} slug={slug} page={page} />
		</Container>
	);
}
