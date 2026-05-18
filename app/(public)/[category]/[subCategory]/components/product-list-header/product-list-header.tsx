import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ProductListBanner } from '../product-list-banner';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { getProductCount } from '@/libs/firebase/db/products/get-products-count';
import { QueryParams } from '../../types/product-list-types';
import { getTranslations } from 'next-intl/server';

interface ProductListHeaderProps {
	slug: string;
	searchParams: QueryParams;
}

export const ProductListHeader = async ({
	slug,
	searchParams,
}: ProductListHeaderProps) => {
	const { color, price, size } = searchParams;
	const [{ name, description }, productCount, t] = await Promise.all([
		getCategoryBySlug(slug),
		getProductCount({ slug, color, price, size }),
		getTranslations('ProductListPage.header'),
	]);

	const productsCount = `${productCount} ${t('products')}`;

	return (
		<Stack as="section" className="mb-28">
			<Heading as="h1" className="mt-10 text-[44px]">
				{name?.toUpperCase()}
			</Heading>
			<Text as="span" className="text-xs text-tertiary">
				{productsCount}
			</Text>
			<Text as="p" size="xl" className="max-w-200 text-gray-700 mb-2">
				{description}
			</Text>
			<ProductListBanner />
		</Stack>
	);
};
