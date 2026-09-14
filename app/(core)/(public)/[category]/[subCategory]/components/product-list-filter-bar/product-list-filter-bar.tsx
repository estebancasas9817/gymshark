'use client';

import { useFilterDrawer } from '@/app/context/filter-context';
import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { ChevronDown, ChevronUp, ListFilter } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductListFilterBarProps {
	productCount: number;
}

export const ProductListFilterBar = ({
	productCount,
}: ProductListFilterBarProps) => {
	const t = useTranslations('FilterBar');
	const { handleOpenDrawer } = useFilterDrawer();
	const productsCount = `${productCount} ${t('products')}`;

	return (
		<Stack
			className="lg:hidden bg-secondary border-t border-t-border-secondary py-4 sticky top-30.5 z-28"
			direction="row"
			justify="between"
			align="center"
		>
			<button
				className="flex justify-center items-center border-r py-4 border-r-border-secondary flex-1 gap-4"
				onClick={() => handleOpenDrawer('sort')}
			>
				<span className="font-sans font-medium text-sm block">{t('sort')}</span>
				<Stack className="gap-0">
					<ChevronUp size={14} />
					<ChevronDown size={14} />
				</Stack>
			</button>
			<Text className="flex-1 text-center text-tertiary text-sm">
				{productsCount}
			</Text>
			<button
				className="flex flex-row justify-center items-center border-l py-4 border-l-border-secondary flex-1 gap-4"
				onClick={() => handleOpenDrawer('filter')}
			>
				<span className="font-sans font-medium text-sm">{t('filter')}</span>
				<ListFilter size={14} className="block" />
			</button>
		</Stack>
	);
};
