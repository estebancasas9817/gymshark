import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { ProductListPaginator } from '../product-list-paginator';
import { Stack } from '@/components/layout/stack';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { QueryParams, RouteParams } from '../../types/product-list-types';
import { PAGE_SIZE } from '../constants/constants';

interface ProductListMainContentProps {
	paramsPromise: Promise<RouteParams>;
	searchParamsPromise: Promise<QueryParams>;
}

export const ProductListMainContent = async ({
	paramsPromise,
	searchParamsPromise,
}: ProductListMainContentProps) => {
	const [params, { page = '1' }] = await Promise.all([
		paramsPromise,
		searchParamsPromise,
	]);
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;
	const currentPage = isNaN(+page) ? 1 : +page;
	const { productCount } = await getCategoryBySlug(slug);
	const totalPages = Math.ceil(productCount / PAGE_SIZE);

	return (
		<Stack className="flex-1">
			<Carousel
				sectionName="TOP 10 IN CATEGORY"
				className="w-full lg:px-0 ps-0 mb-16 mt-0"
				stackClassNames="mt-0"
				size="sm"
			>
				<ProductCardContainer />
			</Carousel>
			<ProductListGrid slug={slug} page={currentPage} />
			<ProductListPaginator
				totalPages={totalPages}
				currentPage={Number(page)}
			/>
		</Stack>
	);
};
