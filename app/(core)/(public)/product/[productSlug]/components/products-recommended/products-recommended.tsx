import { ProductCardContainer } from '@/features/product-card-container';
import { getWeRecommend } from '@/libs/firebase/db/products/get-recommended-products';

interface ProductsRecommended {
	categorySlug: string;
	excludeProductId: string;
}

export const ProductsRecommended = async ({
	categorySlug,
	excludeProductId,
}: ProductsRecommended) => {
	const products = await getWeRecommend(categorySlug, excludeProductId);

	return <ProductCardContainer products={products} />;
};
