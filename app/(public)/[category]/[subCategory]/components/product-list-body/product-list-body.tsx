import { Stack } from '@/components/layout/stack';
import { ProductListSideBar } from '../product-list-side-bar';
import { ProductListMainContent } from '../product-list-main-content';

export const ProductListBody = ({ params, slug, page }) => {
	return (
		<Stack as="section" direction="row" gap="xl">
			<ProductListSideBar />
			<ProductListMainContent params={params} slug={slug} page={page} />
		</Stack>
	);
};
