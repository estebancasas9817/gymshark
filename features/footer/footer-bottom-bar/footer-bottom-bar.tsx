'use client';

import { Conditional } from '@/components/layout/conditional';
import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { LegalLinks } from '@/components/ui/legal-links';
import { Text } from '@/components/ui/text';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useTranslations } from 'next-intl';

export const FooterBottomBar = () => {
	const t = useTranslations('Footer.bottomBar');
	const isDesktop = !!useBreakpoint('lg');

	return (
		<Container>
			{/* start */}
			<Stack direction="row" align="center" justify="between">
				<Text
					as="p"
					className="py-4 text-sm text-gray-700 text-center md:text-start"
					variant="tertiary"
				>
					{t('copyright', { year: new Date().getFullYear() })}
				</Text>
				<Conditional test={isDesktop}>
					<LegalLinks direction="row" />
				</Conditional>
			</Stack>
		</Container>
	);
};
