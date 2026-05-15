import { Stack } from '@/components/layout/stack';
import { ProductListSideBar } from '../product-list-side-bar';
import { ProductListMainContent } from '../product-list-main-content';
import { Suspense } from 'react';
import { RouteParams, QueryParams } from '../../types/product-list-types';

interface ProductListBodyProps {
	params: RouteParams;
	searchParams: QueryParams;
}

export const ProductListBody = ({
	params,
	searchParams,
}: ProductListBodyProps) => {
	return (
		<Stack as="section" direction="row" gap="xl">
			{/* TODO: Update fallback */}
			<Suspense fallback={null}>
				<ProductListSideBar />
			</Suspense>

			{/* TODO: Update fallback */}
			<Suspense fallback={<div>LOADING...</div>}>
				<ProductListMainContent params={params} searchParams={searchParams} />
			</Suspense>
		</Stack>
	);
};
