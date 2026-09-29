import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { getProductsByCategory } from '@/libs/firebase/db/products/get-products-by-category';
import { getTranslations } from 'next-intl/server';

interface ProductListCarouselProps {
	slug: string;
}

const PRODUCTS_PER_CATEGORY = 10;

export const ProductListCarousel = async ({
	slug,
}: ProductListCarouselProps) => {
	const [{ products }, t] = await Promise.all([
		getProductsByCategory({
			page: 1,
			slug,
			sortBy: 'relevancy',
			pageSize: PRODUCTS_PER_CATEGORY,
		}),
		getTranslations('ProductListPage.carousel'),
	]);
	if (products.length !== PRODUCTS_PER_CATEGORY) return null;

	return (
		<Carousel
			sectionName={t('title')}
			className="w-full lg:px-0 ps-0 mb-16 mt-0"
			stackClassNames="mt-0"
			size="sm"
		>
			<ProductCardContainer products={products} />
		</Carousel>
	);
};
