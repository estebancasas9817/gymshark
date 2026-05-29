import { getProductCount } from '@/libs/firebase/db/products/get-products-count';
import { PAGE_SIZE } from '../../constants/constants';
import { QueryParams } from '../../types/product-list-types';
import { ProductListPaginator } from '../product-list-paginator';

interface ProductListPaginatorWrapperProps {
	searchParams: QueryParams;
	slug: string;
}

export const ProductListPaginatorWrapper = async ({
	searchParams,
	slug,
}: ProductListPaginatorWrapperProps) => {
	const { color, page = '1', size, price } = searchParams;
	const productCount = await getProductCount({ color, slug, size, price });
	const totalPages = Math.ceil(productCount / PAGE_SIZE);
	const currentPage = isNaN(+page) ? 1 : +page;

	return (
		<ProductListPaginator totalPages={totalPages} currentPage={currentPage} />
	);
};
