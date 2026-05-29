import { ProductCard } from '@/features/product-card';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { Fragment, Suspense } from 'react';
import { ProductListCollectionHighlight } from '../product-list-collection-highlight';
import { Conditional } from '@/components/layout/conditional';
import { QueryParams } from '../../types/product-list-types';
import { SORT_BY_OPTIONS } from '../../hooks/constants';
import { PAGE_SIZE } from '../../constants/constants';
import { ErrorBoundary } from 'react-error-boundary';

interface ProductListGridProps {
	slug: string;
	searchParams: QueryParams;
	category: string;
}

export const ProductListGrid = async ({
	slug,
	searchParams,
	category,
}: ProductListGridProps) => {
	const {
		page = '1',
		color,
		size,
		sortBy = SORT_BY_OPTIONS.relevancy,
		price,
	} = searchParams;
	const currentPage = isNaN(+page) ? 1 : +page;
	const { products } = await getProductsByCategory({
		page: currentPage,
		color,
		size,
		slug,
		sortBy,
		price,
		pageSize: PAGE_SIZE,
	});

	return (
		<div className="grid grid-cols-4 gap-2">
			{products?.map(({ id, name, skus, basePrice, href, discount }, index) => {
				const shouldDisplayDesktopBanner =
					index === 7 && currentPage === 1 && products.length >= 12;

				return (
					<Fragment key={id}>
						<ProductCard
							key={id}
							name={name}
							price={basePrice.toString()}
							color={skus.color}
							desc={name}
							href={href}
							imageSrc={skus.images}
							discount={discount}
							variant={skus}
						/>
						<Conditional test={shouldDisplayDesktopBanner}>
							<ErrorBoundary fallback={null}>
								<Suspense>
									<ProductListCollectionHighlight category={category} />
								</Suspense>
							</ErrorBoundary>
						</Conditional>
					</Fragment>
				);
			})}
		</div>
	);
};
