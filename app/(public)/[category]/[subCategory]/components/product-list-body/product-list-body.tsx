import { Stack } from '@/components/layout/stack';
import { ProductListSideBar } from '../product-list-side-bar';
import { ProductListMainContent } from '../product-list-main-content';

interface ProductListBodyProps {
	slug: string;
	page: number;
}

export const ProductListBody = ({ slug, page }: ProductListBodyProps) => {
	return (
		<Stack as="section" direction="row" gap="xl">
			<ProductListSideBar />
			<ProductListMainContent slug={slug} page={page} />
		</Stack>
	);
};
