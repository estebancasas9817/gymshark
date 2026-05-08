import { Container } from '@/components/layout/container';
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
	const [params, { page = '1' }] = await Promise.all([
		props.params,
		props.searchParams,
	]);
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;
	const currentPage = isNaN(+page) ? 1 : +page;
	return (
		<Container as="main">
			<ProductListHeader />
			<ProductListBody slug={slug} page={currentPage} />
		</Container>
	);
}
