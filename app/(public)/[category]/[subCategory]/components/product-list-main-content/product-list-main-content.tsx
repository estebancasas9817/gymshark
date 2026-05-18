import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { ProductListPaginator } from '../product-list-paginator';
import { Stack } from '@/components/layout/stack';
import { QueryParams, RouteParams } from '../../types/product-list-types';
import { PAGE_SIZE } from '../../constants/constants';
import { getProductCount } from '@/libs/firebase/db/products/get-products-count';

interface ProductListMainContentProps {
	params: RouteParams;
	searchParams: QueryParams;
}

export const ProductListMainContent = async ({
	params,
	searchParams,
}: ProductListMainContentProps) => {
	const { category, subCategory } = params;
	const { color, page = '1', size, price } = searchParams;
	const slug = `${category}/${subCategory}`;
	const currentPage = isNaN(+page) ? 1 : +page;
	const productCount = await getProductCount({ color, slug, size, price });
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
