import { Stack } from '@/components/layout/stack';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { getEditorialBanner } from '@/libs/firebase/db/categories/get-editorial-banner';
import { Shield, Star, Truck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Fragment } from 'react';

interface ProductListCollectionHighlightProps {
	category: string;
}

export const ProductListCollectionHighlight = async ({
	category,
}: ProductListCollectionHighlightProps) => {
	const [t, bannerData] = await Promise.all([
		getTranslations('ProductListPage.grid.accessoriesBanner'),
		getEditorialBanner(category),
	]);
	if (bannerData === null) return null;
	const { title, badge, description, image, stats } = bannerData;

	return (
		<Stack direction="row" className="col-span-4 py-24" gap="xl">
			<figure className="relative w-150">
				<Image
					src={image}
					alt="banner image"
					width={550}
					height={200}
					className="object-cover h-130 max-w-auto"
				/>
				<Badge className="absolute bottom-3 left-3">{badge}</Badge>
			</figure>
			<Stack gap="md">
				<Heading as="h6" className="text-md">
					{t('tagCategory')}
				</Heading>
				<Heading
					as="h3"
					className="font-black text-3xl uppercase tracking-wider flex flex-col max-w-min"
				>
					{title.split(' ').map((word, index) => (
						<span key={index}>{word}</span>
					))}
				</Heading>
				<Text className="mb-4 text-tertiary">{description}</Text>
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
										<Text className="text-primary font-bold text-md">
											{label.toUpperCase()}
										</Text>
										<Text className="text-tertiary text-sm">{description}</Text>
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
