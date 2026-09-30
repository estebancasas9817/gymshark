'use client';

import { Stack } from '@/components/layout/stack';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { EditorialStat } from '@/types/editorialBanner';
import { cn } from '@/utils/cn/cn';
import { Shield, Star, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Fragment } from 'react';

interface ProductListCollectionHighlightClient {
	image: string;
	badge: string;
	title: string;
	stats: EditorialStat[];
	description: string;
	index: number;
}

const ProductListCollectionHighlightClient = ({
	image,
	badge,
	stats,
	title,
	description,
	index,
}: ProductListCollectionHighlightClient) => {
	const t = useTranslations('ProductListPage.grid.accessoriesBanner');
	const isDesktop = useBreakpoint('lg');
	const isMobile = !useBreakpoint('md');
	const isTablet = !isDesktop && !isMobile;
	let shouldDisplayBanner = false;
	if (isDesktop && index === 7) {
		shouldDisplayBanner = true;
	} else if (isTablet && index === 5) {
		shouldDisplayBanner = true;
	} else if (isMobile && index === 5) {
		shouldDisplayBanner = true;
	}

	return (
		<Stack
			direction="column"
			className={cn(
				'col-span-full py-24 md:flex-row',
				shouldDisplayBanner ? 'flex' : 'hidden',
			)}
			gap="xl"
		>
			<figure className="relative w-full aspect-1/2 md:w-2/3 md:aspect-auto md:self-stretch">
				<Image
					src={image}
					alt="banner image"
					fill
					className="object-cover h-full max-w-auto"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
				<Badge className="absolute bottom-3 left-3">{badge}</Badge>
			</figure>
			<Stack gap="md" className="md:w-2/3">
				<Text as="p" className="text-sm xl:text-base font-bold font-sans">
					{t('tagCategory')}
				</Text>
				<Heading
					as="h3"
					className="font-black text-2xl xl:text-3xl uppercase tracking-wider flex flex-col max-w-min"
				>
					{title.split(' ').map((word, index) => (
						<span key={index}>{word}</span>
					))}
				</Heading>
				<Text className="text-sm xl:text-base mb-4 text-tertiary">
					{description}
				</Text>
				<Stack>
					{stats.map(({ label, description }, index) => {
						let icon = <Truck />;
						if (index === 1) {
							icon = <Shield />;
						} else if (index === 2) {
							icon = <Star />;
						}
						return (
							<Fragment key={label}>
								<Divider />
								<Stack direction="row" gap="lg">
									{icon}
									<div>
										<Text className="text-primary font-bold text-xs md:text-sm xl:text-base">
											{label.toUpperCase()}
										</Text>
										<Text className="text-tertiary text-xs xl:text-sm">
											{description}
										</Text>
									</div>
								</Stack>
							</Fragment>
						);
					})}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ProductListCollectionHighlightClient;
