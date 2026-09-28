import { ProductCard } from '@/features/product-card';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { Fragment, Suspense } from 'react';
import { ProductListCollectionHighlight } from '../product-list-collection-highlight';
import { Conditional } from '@/components/layout/conditional';
import { QueryParams } from '../../types/product-list-types';
import { SORT_BY_OPTIONS } from '../../hooks/constants';
import { PAGE_SIZE } from '../../constants/constants';
import { ErrorBoundary } from 'react-error-boundary';
import { ProductListZeroResults } from '../product-list-zero-results';

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

	if (products.length === 0) {
		return <ProductListZeroResults />;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-2">
			{products.map(({ id, name, sku, basePrice, href, discount }, index) => {
				const shouldDisplayBanner = currentPage === 1 && products.length >= 12;

				return (
					<Fragment key={id}>
						<ProductCard
							key={id}
							name={name}
							price={basePrice}
							color={sku.color}
							desc={name}
							href={href}
							imageSrc={sku.images}
							discount={discount}
							variant={sku}
						/>
						<Conditional test={shouldDisplayBanner}>
							<ErrorBoundary fallback={null}>
								<Suspense>
									<ProductListCollectionHighlight
										category={category}
										index={index}
									/>
								</Suspense>
							</ErrorBoundary>
						</Conditional>
					</Fragment>
				);
			})}
		</div>
	);
};
