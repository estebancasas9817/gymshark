import { getProductCount } from '@/libs/firebase/db/products/get-products-count';
import { QueryParams } from '../../types/product-list-types';
import { ProductListFilterSubmitButton } from '../product-list-filter-submit-button/product-list-filter-submit-button';

interface ProductListFilterSubmitButtonWrapperProps {
	slug: string;
	searchParams: QueryParams;
}
export const ProductListFilterSubmitButtonWrapper = async ({
	searchParams,
	slug,
}: ProductListFilterSubmitButtonWrapperProps) => {
	const { color, price, size } = searchParams;
	const productCount = await getProductCount({ slug, color, price, size });

	return <ProductListFilterSubmitButton productCount={productCount} />;
};
