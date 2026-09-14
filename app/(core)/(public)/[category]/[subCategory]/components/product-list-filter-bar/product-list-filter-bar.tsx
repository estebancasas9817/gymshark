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
			<Stack
				direction="row"
				className="border-r py-4 border-r-border-secondary flex-1"
				justify="center"
				align="center"
			>
				<button className="font-sans font-medium text-sm">{t('sort')}</button>
				<Stack className="gap-0">
					<ChevronUp size={14} />
					<ChevronDown size={14} />
				</Stack>
			</Stack>
			<Text className="flex-1 text-center text-tertiary text-sm">
				{productsCount}
			</Text>
			<Stack
				direction="row"
				className="border-l py-4 border-l-border-secondary flex-1"
				justify="center"
				align="center"
			>
				<button
					className="font-sans font-medium text-sm"
					onClick={() => handleOpenDrawer()}
				>
					{t('filter')}
				</button>
				<ListFilter size={14} className="block" />
			</Stack>
		</Stack>
	);
};
