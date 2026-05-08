import { Stack } from '@/components/layout/stack';
import { ProductCard } from '@/features/product-card';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { Fragment } from 'react';
import { ProductListCollectionHighlight } from '../product-list-collection-highlight';
import { Conditional } from '@/components/layout/conditional';

export const ProductListGrid = async ({ params, slug, page }) => {
	const { id, behavior } = await getCategoryBySlug(slug);
	const products = await getProductsByCategory({ behavior, id, page });
	return (
		<div className="grid grid-cols-4 gap-2">
			{products.map(({ id, name, basePrice }, index) => {
				const isDesktopIndex = index === 7;

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
						<Conditional test={isDesktopIndex}>
							<ProductListCollectionHighlight />
						</Conditional>
					</Fragment>
				);
			})}
		</div>
	);
};
