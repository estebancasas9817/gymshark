import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { ProductListPaginator } from '../product-list-paginator';
import { Stack } from '@/components/layout/stack';

interface ProductListMainContentProps {
	slug: string;
	page: number;
}

export const ProductListMainContent = ({
	slug,
	page,
}: ProductListMainContentProps) => {
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
			<ProductListGrid slug={slug} page={page} />
			<ProductListPaginator totalPages={10} currentPage={Number(page)} />
		</Stack>
	);
};
