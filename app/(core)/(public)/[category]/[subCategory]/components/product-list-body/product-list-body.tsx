import { Stack } from '@/components/layout/stack';
import { ProductListSideBar } from '../product-list-side-bar';
import { ProductListMainContent } from '../product-list-main-content';
import { Suspense } from 'react';
import { RouteParams, QueryParams } from '../../types/product-list-types';
import { ProductListFilterBarWrapper } from '../product-list-filter-bar-wrapper';
import { FilterProvider } from '@/app/context/filter-context';
import { ProductListFilterDrawer } from '../product-list-filter-drawer';
import { ProductListFilterSubmitButtonWrapper } from '../product-list-filter-submit-button-wrapper';

interface ProductListBodyProps {
	params: RouteParams;
	searchParams: QueryParams;
	slug: string;
}

export const ProductListBody = ({
	params,
	searchParams,
	slug,
}: ProductListBodyProps) => {
	return (
		<FilterProvider>
			<Stack
				as="section"
				direction="column"
				gap="xl"
				className="lg:flex-row lg:items-start"
			>
				<Suspense>
					<ProductListFilterBarWrapper
						searchParams={searchParams}
						slug={slug}
					/>
				</Suspense>

				<ProductListFilterDrawer>
					<Suspense>
						<ProductListFilterSubmitButtonWrapper
							searchParams={searchParams}
							slug={slug}
						/>
					</Suspense>
				</ProductListFilterDrawer>

				<Suspense fallback={null}>
					<aside className="hidden lg:block w-80 flex-none sticky top-32 self-start max-h-[calc(100vh-9rem)]">
						<ProductListSideBar />
					</aside>
				</Suspense>

				<ProductListMainContent params={params} searchParams={searchParams} />
			</Stack>
		</FilterProvider>
	);
};
