import { ProductListGrid } from '../product-list-grid';
import { Stack } from '@/components/layout/stack';
import { QueryParams, RouteParams } from '../../types/product-list-types';
import { Suspense } from 'react';
import { ProductListPaginatorWrapper } from '../product-list-paginatior-wrapper';
import { ProductListCarousel } from '../product-list-carousel';
import { ProductGridSkeleton } from '../product-list-loading/product-grid-skeleton';

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
	const gridKey = JSON.stringify(searchParams);

	return (
		<Stack className="flex-1 w-full">
			<Suspense>
				<ProductListCarousel slug={slug} />
			</Suspense>

			<Suspense fallback={<ProductGridSkeleton />} key={gridKey}>
				<ProductListGrid
					slug={slug}
					searchParams={searchParams}
					category={category}
				/>
			</Suspense>
			<Suspense>
				<ProductListPaginatorWrapper searchParams={searchParams} slug={slug} />
			</Suspense>
		</Stack>
	);
};
