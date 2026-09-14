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
		<Stack
			as="aside"
			className="hidden lg:flex lg:basis-80 shrink-0 lg:sticky lg:top-30 lg:h-[calc(100vh-7.5rem)] lg:overflow-y-auto scroll-smooth lg:pr-2 gap-0"
		>
			<Stack
				direction="row"
				align="start"
				justify="between"
				className="pb-6"
				gap="xl"
			>
				<Heading as="h2" className="text-sm">
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

			<Accordion
				title={t('sections.sort_by.title')}
				classNames="py-6"
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
				classNames="flex gap-2 flex-wrap py-6"
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
				classNames="flex flex-wrap gap-2 py-6"
				shouldExpand={!!colorParam}
			>
				<ProductListColorFilter colorOptions={colorOptions} />
			</Accordion>

			<Accordion
				title={t('sections.price.title')}
				classNames="py-6 flex flex-wrap gap-2"
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
		</Stack>
	);
};
