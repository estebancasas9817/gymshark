import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { ProductListPaginator } from '../product-list-paginator';
import { Stack } from '@/components/layout/stack';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';

interface ProductListMainContentProps {
	slug: string;
	page: number;
	cursor: number | null;
}

export const ProductListMainContent = async ({
	slug,
	page,
	cursor,
}: ProductListMainContentProps) => {
	const { id, behavior } = await getCategoryBySlug(slug);
	const { nextCursor } = await getProductsByCategory({
		behavior,
		id,
		cursor,
	});

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
			<ProductListGrid slug={slug} cursor={cursor} />
			<ProductListPaginator
				totalPages={3}
				currentPage={Number(page)}
				cursor={nextCursor}
			/>
		</Stack>
	);
};
