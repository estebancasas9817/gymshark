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
		<ProductCardContainer
			products={products}
			stackClassNames="w-full lg:flex-wrap overflow-x-auto scroll-smooth scrollbar-none lg:overflow-x-visible lg:scroll-auto"
		/>
	);
};
