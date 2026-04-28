import { Stack } from '@/components/layout/stack';
import { PromoCard } from '@/components/ui/promo-card';
import { Text } from '@/components/ui/text';
import { useTranslations } from 'next-intl';
import PromoCardEmail from '@/public/promo-card-email.jpg';
import PromoCardGymshark from '@/public/promo-card-gymshark.jpg';
import PromoCardStudents from '@/public/promo-card-students.jpg';

export const FooterPromos = () => {
	const t = useTranslations('Footer.promos');
	const promoKeys = Object.keys(t.raw('items'));
	return (
		<div>
			<Text as="p" className="text-sm font-sans font-bold mb-6">
				{t('title')}
			</Text>
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
	);
};
