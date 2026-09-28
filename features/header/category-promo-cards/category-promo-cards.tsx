'use client';

import { Stack } from '@/components/layout/stack';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ShopWomen from '@/public/shop-women.jpeg';
import ShopMen from '@/public/shop-men.avif';
import ShopAccesories from '@/public/shop-accesories.jpeg';
import Image from 'next/image';
import { cn } from '@/utils/cn/cn';
import { Heading } from '@/components/ui/heading';

interface CategoryPromoCardsProps {
	handleToogleHeader: (type: 'open' | 'close') => void;
}

export const CategoryPromoCards = ({
	handleToogleHeader,
}: CategoryPromoCardsProps) => {
	const t = useTranslations('Departments');
	const shopDepartmentArray = [ShopWomen, ShopMen, ShopAccesories];

	return (
		<Stack
			direction="row"
			className={cn(
				'-mx-6 px-6 mt-6 gap-4',
				'overflow-x-auto scroll-smooth scrollbar-none shrink-0',
			)}
		>
			{Object.keys(t.raw('departments')).map((key, index) => (
				<figure
					key={key}
					className="relative aspect-video h-50 flex-none w-[81%] rounded-md overflow-hidden"
				>
					<Link
						href={t(`departments.${key}.href`)}
						onClick={() => handleToogleHeader('close')}
					>
						<div
							className={cn(
								'absolute inset-0 z-10 transition-opacity bg-linear-to-t from-black/60 via-black/20 to-transparent',
							)}
						/>
						<Image
							src={shopDepartmentArray[index]}
							alt={t(`departments.${key}.label`)}
							fill
							className="object-cover object-[center_20%]"
						/>
						<Heading
							className="absolute bottom-3 left-4 text-secondary z-20"
							as="h5"
						>
							{t(`departments.${key}.label`)}
						</Heading>
					</Link>
				</figure>
			))}
		</Stack>
	);
};
