import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { Stack } from '@/components/layout/stack';
import { QueryParams, RouteParams } from '../../types/product-list-types';
import { Suspense } from 'react';
import { ProductListPaginatorWrapper } from '../product-list-paginatior-wrapper';
import { ProductListCarousel } from '../product-list-carousel';

interface ProductListMainContentProps {
	params: RouteParams;
	searchParams: QueryParams;
}

export const ProductListMainContent = ({
	params,
	searchParams,
}: ProductListMainContentProps) => {
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;

	return (
		<Stack className="flex-1">
			<Suspense>
				<ProductListCarousel slug={slug} />
			</Suspense>

			<Suspense>
				<ProductListGrid slug={slug} searchParams={searchParams} />
			</Suspense>
			<Suspense>
				<ProductListPaginatorWrapper searchParams={searchParams} slug={slug} />
			</Suspense>
		</Stack>
	);
};
