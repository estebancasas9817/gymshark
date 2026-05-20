import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { Stack } from '@/components/layout/stack';
import { QueryParams, RouteParams } from '../../types/product-list-types';
import { Suspense } from 'react';
import { ProductListPaginatorWrapper } from '../product-list-paginatior-wrapper';

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
			<Carousel
				sectionName="TOP 10 IN CATEGORY"
				className="w-full lg:px-0 ps-0 mb-16 mt-0"
				stackClassNames="mt-0"
				size="sm"
			>
				<ProductCardContainer />
			</Carousel>

			<Suspense>
				<ProductListGrid slug={slug} searchParams={searchParams} />
			</Suspense>
			<Suspense>
				<ProductListPaginatorWrapper searchParams={searchParams} slug={slug} />
			</Suspense>
		</Stack>
	);
};;;
