'use client';

import { Container } from '@/components/layout/container';
import { Divider } from '@/components/ui/divider';
import { FooterNav } from './footer-nav';
import { Stack } from '@/components/layout/stack';
import { FooterPromos } from './footer-promos';
import { PaymentMethods } from '@/components/ui/payment-methods';
import { PAYMENT_METHODS, SOCIAL_LINKS } from './footer-promos/constants';
import { SocialLinks } from '@/components/ui/social-links';
import { FooterBottomBar } from './footer-bottom-bar';
import { Conditional } from '@/components/layout/conditional';
import { LegalLinks } from '@/components/ui/legal-links';
import { useBreakpoint } from '@/hooks/use-breakpoint';

export const Footer = () => {
	const isMobileOrTablet = !useBreakpoint('lg');
	const isTablet = useBreakpoint('md');
	const isMobile = !isTablet && isMobileOrTablet;
	const alignStyles = isTablet ? 'start' : 'center';

	return (
		<>
			<Divider className="hidden lg:block" />
			<Container as="footer" className="py-8">
				<Stack
					as="div"
					direction="column"
					align="start"
					className="lg:flex-row gap-0 lg:gap-20"
				>
					<FooterNav />
					<FooterPromos />
				</Stack>
				<Conditional test={!!isMobile}>
					<Stack direction="row" justify="center" className="mt-8">
						{SOCIAL_LINKS.map(({ logo, alt, src, ariaLabel }) => (
							<SocialLinks
								logo={logo}
								key={alt}
								src={src}
								ariaLabel={ariaLabel}
							/>
						))}
					</Stack>
				</Conditional>
				<Conditional test={isMobileOrTablet}>
					<Stack align={alignStyles}>
						<LegalLinks direction="column" />
					</Stack>
				</Conditional>
				<Stack
					direction="row"
					align="end"
					className="justify-center md:justify-between"
				>
					<Stack
						as="ul"
						direction="row"
						justify={alignStyles}
						className="mt-16"
						gap="sm"
					>
						{PAYMENT_METHODS.map(({ alt, src }) => (
							<li key={alt}>
								<PaymentMethods src={src} alt={alt} />
							</li>
						))}
					</Stack>
					<Conditional test={!!isTablet}>
						<Stack direction="row">
							{SOCIAL_LINKS.map(({ logo, alt, src, ariaLabel }) => (
								<SocialLinks
									logo={logo}
									key={alt}
									src={src}
									ariaLabel={ariaLabel}
								/>
							))}
						</Stack>
					</Conditional>
				</Stack>
			</Container>
			<Divider />
			<FooterBottomBar />
		</>
	);
};
