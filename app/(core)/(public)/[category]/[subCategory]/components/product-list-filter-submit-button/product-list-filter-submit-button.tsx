'use client';

import { useFilterDrawer } from '@/app/context/filter-context';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface ProductListFilterSubmitbuttonProps {
	productCount: number;
}
export const ProductListFilterSubmitButton = ({
	productCount,
}: ProductListFilterSubmitbuttonProps) => {
	const t = useTranslations('FilterBar');
	const { handleCloseDrawer } = useFilterDrawer();
	const productCountText = `${t('see_products')} (${productCount})`;

	return (
		<Button
			onClick={() => handleCloseDrawer()}
			className="text-sm font-normal w-full py-4"
		>
			{productCountText}
		</Button>
	);
};
