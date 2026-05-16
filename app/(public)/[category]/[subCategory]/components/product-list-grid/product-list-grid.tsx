import { ProductCard } from '@/features/product-card';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { Fragment } from 'react';
import { ProductListCollectionHighlight } from '../product-list-collection-highlight';
import { Conditional } from '@/components/layout/conditional';
import { QueryParams } from '../../types/product-list-types';
import { SORT_BY_OPTIONS } from '../../hooks/constants';

interface ProductListGridProps {
	slug: string;
	searchParams: QueryParams;
}

export const ProductListGrid = async ({
	slug,
	searchParams,
}: ProductListGridProps) => {
	const {
		page = '1',
		color,
		size,
		sortBy = SORT_BY_OPTIONS.relevancy,
	} = searchParams;
	const currentPage = isNaN(+page) ? 1 : +page;
	const { behavior } = await getCategoryBySlug(slug);
	const { products } = await getProductsByCategory({
		page: currentPage,
		color,
		size,
		slug,
		sortBy,
	});

	return (
		<div className="grid grid-cols-4 gap-2">
			{products?.map(({ id, name, skus, basePrice, href }, index) => {
				const shouldDisplayDesktopBanner =
					index === 7 && currentPage === 1 && behavior === 'expand';

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
							discount={undefined}
							variant={skus}
						/>
						<Conditional test={shouldDisplayDesktopBanner}>
							<ProductListCollectionHighlight />
						</Conditional>
					</Fragment>
				);
			})}
		</div>
	);
};
