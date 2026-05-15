import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { ProductListPaginator } from '../product-list-paginator';
import { Stack } from '@/components/layout/stack';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { QueryParams, RouteParams } from '../../types/product-list-types';
import { PAGE_SIZE } from '../../constants/constants';
import { getProductCountByColor } from '@/libs/firebase/db/products/get-products-count-by-color';

interface ProductListMainContentProps {
	paramsPromise: Promise<RouteParams>;
	searchParamsPromise: Promise<QueryParams>;
}

export const ProductListMainContent = async ({
	paramsPromise,
	searchParamsPromise,
}: ProductListMainContentProps) => {
	const [params, searchParams] = await Promise.all([
		paramsPromise,
		searchParamsPromise,
	]);
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;
	const page = searchParams.page ?? '1';
	const currentPage = isNaN(+page) ? 1 : +page;
	const productCount = await getProductCountByColor(searchParams.color);
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
			<ProductListGrid slug={slug} searchParams={searchParams} />
			<ProductListPaginator totalPages={totalPages} currentPage={currentPage} />
		</Stack>
	);
};
