import { Stack } from '@/components/layout/stack';
import { ProductListSideBar } from '../product-list-side-bar';
import { ProductListMainContent } from '../product-list-main-content';

interface ProductListBodyProps {
	slug: string;
	page: number;
	cursor: number | null;
}

export const ProductListBody = ({
	slug,
	page,
	cursor,
}: ProductListBodyProps) => {
	return (
		<Stack as="section" direction="row" gap="xl">
			<ProductListSideBar />
			<ProductListMainContent slug={slug} page={page} cursor={cursor} />
		</Stack>
	);
};
