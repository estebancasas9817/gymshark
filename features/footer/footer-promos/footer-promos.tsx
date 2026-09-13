'use client';

import { Stack } from '@/components/layout/stack';
import { PromoCard } from '@/components/ui/promo-card';
import { Text } from '@/components/ui/text';
import { useTranslations } from 'next-intl';
import PromoCardEmail from '@/public/promo-card-email.avif';
import PromoCardGymshark from '@/public/promo-card-gymshark.avif';
import PromoCardStudents from '@/public/promo-card-students.avif';

export const FooterPromos = () => {
	const t = useTranslations('Footer.promos');
	const promoKeys = Object.keys(t.raw('items'));

	return (
		<div className="w-full border-x-0 border-t border-t-gray-200 py-4 lg:py-0 lg:border-0">
			<Text as="p" className="text-sm font-sans font-bold mb-6">
				{t('title')}
			</Text>
			<div className="scroll-smooth overflow-x-auto scrollbar-none lg:overflow-x-visible lg:scroll-auto lg:scrollbar-default w-full">
				<Stack as="div" direction="row" className="gap-1">
					{promoKeys.map((promo) => {
						let src = PromoCardGymshark;
						if (promo === 'students') {
							src = PromoCardStudents;
						} else if (promo === 'newsletter') {
							src = PromoCardEmail;
						}

						return (
							<PromoCard
								key={promo}
								title={t(`items.${promo}.label`)}
								alt={t(`items.${promo}.alt`)}
								src={src}
							/>
						);
					})}
				</Stack>
			</div>
		</div>
	);
};
