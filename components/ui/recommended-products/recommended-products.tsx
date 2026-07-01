import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';

interface RecommendedProductsProps {
	slug: string;
	sectionName: string;
	page?: number;
	shouldUpdateImgOnHover?: boolean;
}

export const RecommendedProducts = async ({
	slug,
	sectionName,
	page = 1,
	shouldUpdateImgOnHover,
}: RecommendedProductsProps) => {
	const { products } = await getProductsByCategory({
		page,
		slug,
		pageSize: 10,
		sortBy: 'relevancy',
	});

	return (
		<Carousel sectionName={sectionName} className="w-full my-16">
			<ProductCardContainer
				products={products}
				shouldUpdateImgOnHover={shouldUpdateImgOnHover}
			/>
		</Carousel>
	);
};
