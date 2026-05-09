import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { RadioButton } from '@/components/ui/radio-button';
import { Accordion } from '@/features/accordion';
import { useTranslations } from 'next-intl';
import { ProductListColorFilter } from '../product-list-color-filter';

export const ProductListSideBar = () => {
	const t = useTranslations('ProductListPage.sidebar');
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

	return (
		<Stack as="aside" className="basis-75 relative">
			<div className="sticky top-30 lef-0">
				<Stack direction="row" align="start" justify="between" className="pb-6">
					<Heading as="h2" className="text-sm">
						{t('header.title')}
					</Heading>
					<Button
						variant="inline"
						className="text-gray-300 text-sm underline-none p-0"
					>
						{t('header.clear_all')}
					</Button>
				</Stack>
				<Accordion title={t('sections.sort_by.title')} classNames="py-6">
					<RadioButton inputs={sortOptions} name="sort" />
				</Accordion>
				<Accordion
					title={t('sections.size.title')}
					classNames="flex gap-2 flex-wrap py-6"
				>
					{sizeOptions.map(([key, size]) => (
						<Button
							className="min-w-22 self-center h-10 border border-gray-300 text-gray-700"
							variant="secondary"
							size="sm"
							key={key}
						>
							{size}
						</Button>
					))}
				</Accordion>
				<Accordion
					title={t('sections.color.title')}
					classNames="flex flex-wrap gap-2 py-6"
				>
					<ProductListColorFilter colorOptions={colorOptions} />
				</Accordion>
				<Accordion
					title={t('sections.price.title')}
					classNames="py-6 flex flex-wrap gap-2"
				>
					{priceOptions.map(([key, price]) => (
						<Button
							className="h-10 border border-gray-300 flex-1 basis-1/3 text-gray-700"
							variant="secondary"
							size="sm"
							key={key}
						>
							{price}
						</Button>
					))}
				</Accordion>
			</div>
		</Stack>
	);
};
