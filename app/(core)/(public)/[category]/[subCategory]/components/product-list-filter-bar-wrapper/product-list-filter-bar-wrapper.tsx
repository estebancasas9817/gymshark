import { getProductCount } from '@/libs/firebase/db/products/get-products-count';
import { QueryParams } from '../../types/product-list-types';
import { ProductListFilterBar } from '../product-list-filter-bar/product-list-filter-bar';

interface ProductListFilterBarWrapperProps {
	slug: string;
	searchParams: QueryParams;
}
export const ProductListFilterBarWrapper = async ({
	slug,
	searchParams,
}: ProductListFilterBarWrapperProps) => {
	const { color, price, size } = searchParams;
	const productCount = await getProductCount({ slug, color, price, size });

	return <ProductListFilterBar productCount={productCount} />;
};
