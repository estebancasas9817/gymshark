import { Stack } from '@/components/layout/stack';
import { ProductListSideBar } from '../product-list-side-bar';
import { ProductListMainContent } from '../product-list-main-content';
import { Suspense } from 'react';
import { RouteParams, QueryParams } from '../../types/product-list-types';

interface ProductListBodyProps {
	paramsPromise: Promise<RouteParams>;
	searchParamsPromise: Promise<QueryParams>;
}

export const ProductListBody = ({
	paramsPromise,
	searchParamsPromise,
}: ProductListBodyProps) => {
	return (
		<Stack as="section" direction="row" gap="xl">
			{/* TODO: Update fallback */}
			<Suspense fallback={null}>
				<ProductListSideBar />
			</Suspense>
			<Suspense>
				<ProductListMainContent
					paramsPromise={paramsPromise}
					searchParamsPromise={searchParamsPromise}
				/>
			</Suspense>
		</Stack>
	);
};
