'use client';

import { RadioButton } from '@/components/ui/radio-button';
import { Accordion } from '@/features/accordion';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, startTransition, useState } from 'react';
import { QUERY_PARAMS, SORT_BY_OPTIONS } from '../../hooks/constants';
import { useFilter } from '../../hooks/use-filter';
import { useFilterDrawer } from '@/app/context/filter-context';

export const ProductListSortByMobile = () => {
	const t = useTranslations('ProductListPage.sidebar');
	const searchParams = useSearchParams();
	const { handleSortBy } = useFilter();
	const { handleCloseDrawer } = useFilterDrawer();

	const sortByParam =
		searchParams.get(QUERY_PARAMS.sortBy) ?? SORT_BY_OPTIONS.relevancy;
	const [sortBy, setSortBy] = useState<string | null>(sortByParam);

	const sortOptions: [string, string][] = Object.entries(
		t.raw('sections.sort_by.options'),
	);
	const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
		const sortByOption = e.target.value;
		setSortBy(sortByOption);
		startTransition(() => {
			handleSortBy(sortByOption);
			handleCloseDrawer();
		});
	};

	return (
		<Accordion
			title={t('sections.sort_by.title')}
			classNames="py-4 border-none px-4"
			shouldExpand
		>
			<RadioButton
				inputs={sortOptions}
				name="sort"
				handleChange={handleSortChange}
				checkedRadio={sortBy}
			/>
		</Accordion>
	);
};
