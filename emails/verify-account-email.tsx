import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Text,
	Heading,
	Hr,
} from '@react-email/components';
import * as React from 'react';

interface VerifyAccountEmailProps {
	name?: string;
	url?: string;
}

export default function VerifyAccountEmail({
	name = 'Athlete',
	url = 'http://localhost:3001/verify-account?token=mock-token',
}: VerifyAccountEmailProps) {
	return (
		<Html lang="en">
			<Head />
			<Preview>Verify your account and join the Fit Store community</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header with Fit Store Brand Styling */}
					<Section style={headerSection}>
						<Heading style={logoText}>FIT STORE</Heading>
					</Section>

					{/* Email Body */}
					<Section style={contentSection}>
						<Heading style={welcomeHeading}>
							HELLO, {name.toUpperCase()}!
						</Heading>

						<Text style={paragraph}>
							Thank you for signing up. To fully activate your account, track
							your orders, and gain access to exclusive releases, we need to
							confirm your email address.
						</Text>

						{/* Call to Action Button */}
						<Section style={buttonContainer}>
							<Button href={url} style={button}>
								VERIFY MY ACCOUNT
							</Button>
						</Section>

						<Text style={paragraph}>
							This verification link will expire in 24 hours. If you did not
							create an account with us, you can safely ignore this message.
						</Text>

						<Hr style={divider} />

						{/* Fallback URL Link */}
						<Text style={footerText}>
							Having trouble with the button? Copy and paste this URL into your
							browser:
							<br />
							<a href={url} style={link}>
								{url}
							</a>
						</Text>
					</Section>

					{/* Footer Section with Project Disclaimer */}
					<Section style={footerSection}>
						<Text style={footerSecondary}>
							© {new Date().getFullYear()} Fit Store. All rights reserved.
						</Text>
						<Text style={cloneBadge}>
							This email was sent from a <strong>Fit Store</strong> development
							environment.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

/* 🎨 Inline Styles for High Email Client Compatibility */
const main = {
	backgroundColor: '#f6f6f6',
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
	backgroundColor: '#ffffff',
	margin: '40px auto',
	maxWidth: '560px',
	borderRadius: '4px',
	overflow: 'hidden',
	boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
};

const headerSection = {
	backgroundColor: '#000000',
	padding: '32px 20px',
	textAlign: 'center' as const,
};

const logoText = {
	color: '#ffffff',
	fontSize: '26px',
	fontWeight: '900',
	letterSpacing: '2px',
	margin: '0',
};

const contentSection = {
	padding: '40px 40px 30px 40px',
};

const welcomeHeading = {
	color: '#111111',
	fontSize: '22px',
	fontWeight: '800',
	letterSpacing: '0.5px',
	margin: '0 0 20px 0',
};

const paragraph = {
	color: '#444444',
	fontSize: '15px',
	lineHeight: '24px',
	margin: '0 0 20px 0',
};

const buttonContainer = {
	textAlign: 'center' as const,
	margin: '30px 0',
};

const button = {
	backgroundColor: '#000000',
	color: '#ffffff',
	fontSize: '14px',
	fontWeight: '700',
	letterSpacing: '1px',
	textDecoration: 'none',
	padding: '16px 32px',
	borderRadius: '4px',
	display: 'inline-block',
};

const divider = {
	borderColor: '#eeeeee',
	margin: '30px 0 20px 0',
};

const footerText = {
	color: '#777777',
	fontSize: '12px',
	lineHeight: '18px',
	margin: '0',
};

const link = {
	color: '#000000',
	textDecoration: 'underline',
};

const footerSection = {
	backgroundColor: '#f9f9f9',
	padding: '24px 20px',
	textAlign: 'center' as const,
	borderTop: '1px solid #eeeeee',
};

const footerSecondary = {
	color: '#999999',
	fontSize: '11px',
	margin: '0 0 8px 0',
};

const cloneBadge = {
	color: '#b5b5b5',
	fontSize: '11px',
	textTransform: 'uppercase' as const,
	letterSpacing: '0.5px',
	margin: '0',
};
