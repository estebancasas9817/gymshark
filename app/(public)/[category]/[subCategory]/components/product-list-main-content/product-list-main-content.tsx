import { Stack } from '@/components/layout/stack';
import { ProductListGrid } from '../product-list-grid';
import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';

export const ProductListMainContent = ({ params, slug, page }) => {
	return (
		<section className="flex-1">
			<Carousel
				sectionName="TOP 10 IN CATEGORY"
				className="w-full lg:px-0 ps-0 mb-16"
			>
				<ProductCardContainer />
			</Carousel>
			<ProductListGrid params={params} slug={slug} page={page} />
		</section>
	);
};
