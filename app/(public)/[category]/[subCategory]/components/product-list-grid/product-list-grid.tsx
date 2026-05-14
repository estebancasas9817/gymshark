import { ProductCard } from '@/features/product-card';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { Fragment } from 'react';
import { ProductListCollectionHighlight } from '../product-list-collection-highlight';
import { Conditional } from '@/components/layout/conditional';

interface ProductListGridProps {
	slug: string;
	page: number;
}

export const ProductListGrid = async ({ slug, page }: ProductListGridProps) => {
	const { id, behavior } = await getCategoryBySlug(slug);
	const { products } = await getProductsByCategory({
		behavior,
		id,
		page,
	});

	return (
		<div className="grid grid-cols-4 gap-2">
			{products?.map(({ id, name }, index) => {
				const shouldDisplayDesktopBanner =
					index === 7 && page === 1 && behavior === 'expand';

				return (
					<Fragment key={id}>
						<ProductCard
							key={id}
							name={name}
							price={'300'}
							color="red"
							desc="desc"
							href=""
							imageSrc={[
								'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg',
							]}
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
