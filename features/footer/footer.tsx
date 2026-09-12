import { Container } from '@/components/layout/container';
import { Divider } from '@/components/ui/divider';
import { FooterNav } from './footer-nav';
import { Stack } from '@/components/layout/stack';
import { FooterPromos } from './footer-promos';
import { PaymentMethods } from '@/components/ui/payment-methods';
import { PAYMENT_METHODS, SOCIAL_LINKS } from './footer-promos/constants';
import { SocialLinks } from '@/components/ui/social-links';
import { FooterBottomBar } from './footer-bottom-bar';

export const Footer = () => {
	return (
		<>
			<Divider />
			<Container as="footer" className="py-8">
				<Stack
					as="div"
					direction="column"
					align="start"
					className="lg:flex-row"
				>
					<FooterNav />
					<FooterPromos />
				</Stack>
				<Stack direction="row" align="end" justify="between">
					<Stack as="ul" direction="row" className="mt-16" gap="sm">
						{PAYMENT_METHODS.map(({ alt, src }) => (
							<li key={alt}>
								<PaymentMethods src={src} alt={alt} />
							</li>
						))}
					</Stack>
					<Stack direction="row">
						{SOCIAL_LINKS.map(({ logo, alt, src }) => (
							<SocialLinks logo={logo} key={alt} src={src} />
						))}
					</Stack>
				</Stack>
			</Container>
			<Divider />
			<FooterBottomBar />
		</>
	);
};
