import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { LegalLinks } from '@/components/ui/legal-links';
import { Text } from '@/components/ui/text';
import { useTranslations } from 'next-intl';

export const FooterBottomBar = () => {
	const t = useTranslations('Footer.bottomBar');
	return (
		<Container>
			<Stack direction="row" align="center" justify="between">
				<Text as="p" className="py-4 text-sm text-gray-700" variant="tertiary">
					{t('copyright', { year: new Date().getFullYear() })}
				</Text>
				<LegalLinks />
			</Stack>
		</Container>
	);
};
