'use client';

import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { RadioButton } from '@/components/ui/radio-button';
import { Accordion } from '@/features/accordion';
import { useTranslations } from 'next-intl';
import { ProductListColorFilter } from '../product-list-color-filter';
import { ChangeEvent, useState } from 'react';
import { useFilter } from '../../hooks/use-filter';
import { cn } from '@/utils/cn/cn';
import { useSearchParams } from 'next/navigation';
import { QUERY_PARAMS, SORT_BY_OPTIONS } from '../../hooks/constants';

export const ProductListSideBar = () => {
	const t = useTranslations('ProductListPage.sidebar');
	const { handleSortBy, handleSize, handlePrice, handleClearAllFilters } =
		useFilter();
	const searchParams = useSearchParams();
	const sizeParam = searchParams.get(QUERY_PARAMS.size)?.toUpperCase();
	const sortByParam =
		searchParams.get(QUERY_PARAMS.sortBy) ?? SORT_BY_OPTIONS.relevancy;
	const priceParam = searchParams.get(QUERY_PARAMS.price);
	const colorParam = searchParams.get(QUERY_PARAMS.color);
	const [size, setSize] = useState<string | undefined>(sizeParam);
	const [sortBy, setSortBy] = useState<string | null>(sortByParam);
	const [price, setPrice] = useState<string | null>(priceParam);

	const hasFilters = !![...searchParams.keys()].find((key) => key !== 'page');

	const sortOptions: [string, string][] = Object.entries(
		t.raw('sections.sort_by.options'),
	);
	const sizeOptions: [string, string][] = Object.entries(
		t.raw('sections.size.options'),
	);
	const colorOptions: [string, string][] = Object.entries(
		t.raw('sections.color.options'),
	);
	const priceOptions: [string, string][] = Object.entries(
		t.raw('sections.price.options'),
	);

	const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
		const sortByOption = e.target.value;
		setSortBy(sortByOption);
		handleSortBy(sortByOption);
	};

	const handleClickPrice = (price: string) => {
		const normalizePrice = price?.slice(6, price.length);
		setPrice(normalizePrice);
		handlePrice(normalizePrice);
	};

	return (
		<nav className="w-full flex flex-col h-full lg:max-h-[calc(100vh-9rem)] overflow-hidden">
			<Stack
				direction="row"
				align="center"
				justify="between"
				className="sticky top-0 z-20 bg-secondary pb-4 pt-1 w-full flex-none border-b border-gray-100/50"
				gap="xl"
			>
				<Heading as="h2" className="text-sm font-bold uppercase tracking-wider">
					{t('header.title')}
				</Heading>
				<Button
					variant="inline"
					className={cn(
						'text-gray-300 text-sm underline-none p-0',
						hasFilters && 'text-primary',
					)}
					onClick={handleClearAllFilters}
					disabled={!hasFilters}
				>
					{t('header.clear_all')}
				</Button>
			</Stack>

			<div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-2 pr-2">
				<Accordion
					title={t('sections.sort_by.title')}
					classNames="py-4"
					shouldExpand
				>
					<RadioButton
						inputs={sortOptions}
						name="sort"
						handleChange={handleSortChange}
						checkedRadio={sortBy}
					/>
				</Accordion>

				<Accordion
					title={t('sections.size.title')}
					classNames="flex gap-2 flex-wrap py-4"
					shouldExpand={!!size}
				>
					{sizeOptions.map(([key, value]) => (
						<Button
							className={cn(
								'min-w-22 self-center h-10 border border-gray-300 text-gray-700',
								value === size && 'bg-primary text-secondary',
							)}
							variant="secondary"
							size="sm"
							key={key}
							onClick={() => {
								setSize(value);
								handleSize(value);
							}}
						>
							{value}
						</Button>
					))}
				</Accordion>

				<Accordion
					title={t('sections.color.title')}
					classNames="flex flex-wrap gap-2 py-4"
					shouldExpand={!!colorParam}
				>
					<ProductListColorFilter colorOptions={colorOptions} />
				</Accordion>

				<Accordion
					title={t('sections.price.title')}
					classNames="py-4 flex flex-wrap gap-2"
					shouldExpand={!!price}
				>
					{priceOptions.map(([key, value]) => (
						<Button
							className={cn(
								'h-10 border border-gray-300 flex-1 basis-1/3 text-gray-700',
								price && key.includes(price) && 'bg-primary text-secondary',
							)}
							variant="secondary"
							size="sm"
							key={key}
							onClick={() => handleClickPrice(key)}
						>
							{value}
						</Button>
					))}
				</Accordion>
			</div>
		</nav>
	);
};
