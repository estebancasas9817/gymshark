import { ProductCardContainer } from '@/features/product-card-container';
import { getYouMightLike } from '@/libs/firebase/db/products/get-products-you-might-like';

interface ProductsYouMightLikeProps {
	categorySlug: string;
	excludeProductId: string;
}

export const ProductsYouMightLike = async ({
	categorySlug,
	excludeProductId,
}: ProductsYouMightLikeProps) => {
	const products = await getYouMightLike(categorySlug, excludeProductId);

	return (
		<ProductCardContainer products={products} stackClassNames="flex-wrap" />
	);
};
