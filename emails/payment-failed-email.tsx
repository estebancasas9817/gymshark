import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
	Hr,
} from '@react-email/components';

interface PaymentFailedEmailProps {
	name: string;
	url: string;
}

const BG_COLOR = '#f0ede7';
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

export const PaymentFailedEmail = ({
	name = 'Athlete',
	url = 'https://localhost:3000/cart',
}: PaymentFailedEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Your Gymshark payment could not be processed.</Preview>
			<Body style={styles.body}>
				<Container style={styles.container}>
					{/* Header de Marca */}
					<Section style={headerSection}>
						<Heading style={logoText}>GYMSHARK CLONE</Heading>
					</Section>

					{/* Línea divisoria brutalista */}
					<Hr style={styles.brutalDivider} />

					{/* Contenido Principal */}
					<Section>
						<Heading style={styles.heading}>PAYMENT FAILED</Heading>

						<Text style={styles.welcomeText}>Hi {name},</Text>

						<Text style={styles.paragraph}>
							We tried to process the payment for your order, but unfortunately,
							the transaction was declined by your payment provider. No charges
							have been made to your account.
						</Text>

						<Text style={styles.paragraph}>
							Don't worry, your gear hasn't gone anywhere. The items are still
							reserved and waiting securely inside your shopping cart.
						</Text>
					</Section>

					{/* Botón de Reintento */}
					<Section style={styles.buttonSection}>
						<Button style={styles.button} href={url}>
							Complete My Purchase
						</Button>
					</Section>

					<Hr style={styles.subtleDivider} />

					{/* Footer del Correo */}
					<Section style={styles.footerSection}>
						<Text style={styles.footerText}>
							Need help? Contact our support squad if your payment keeps
							failing.
						</Text>
						<Text style={styles.copyrightText}>
							© {new Date().getFullYear()} Gymshark Clone. All rights reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Objeto de Estilos Inline (Reemplazo de Tailwind)
const styles = {
	body: {
		backgroundColor: BG_COLOR,
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
		margin: '0 auto',
		padding: '0 8px',
	},
	container: {
		border: '1px solid #d4d4d4',
		borderRadius: '4px',
		margin: '40px auto',
		padding: '20px',
		maxWidth: '465px',
		backgroundColor: '#ffffff',
	},
	headerSection: {
		marginTop: '16px',
		textAlign: 'center' as const,
	},
	brandText: {
		fontWeight: '900',
		color: '#000000',
		fontSize: '20px',
		letterSpacing: '0.4em',
		margin: '0',
		textTransform: 'uppercase' as const,
	},
	brutalDivider: {
		border: '0',
		borderTop: '2px solid #000000',
		margin: '24px 0',
	},
	heading: {
		color: '#000000',
		fontSize: '24px',
		fontWeight: '900',
		letterSpacing: '-0.02em',
		textTransform: 'uppercase' as const,
		margin: '0',
	},
	welcomeText: {
		color: '#000000',
		fontSize: '15px',
		lineHeight: '24px',
		marginTop: '16px',
		fontWeight: '600',
	},
	paragraph: {
		color: '#737373',
		fontSize: '14px',
		lineHeight: '22px',
		marginTop: '12px',
	},
	buttonSection: {
		textAlign: 'center' as const,
		marginTop: '32px',
		marginBottom: '24px',
	},
	button: {
		backgroundColor: '#000000',
		color: '#ffffff',
		fontSize: '12px',
		fontWeight: '700',
		letterSpacing: '0.15em',
		textTransform: 'uppercase' as const,
		textDecoration: 'none',
		textAlign: 'center' as const,
		padding: '16px 32px',
		borderRadius: '9999px',
		display: 'inline-block',
	},
	subtleDivider: {
		border: '0',
		borderTop: '1px solid #e5e5e5',
		margin: '20px 0',
	},
	footerSection: {
		textAlign: 'center' as const,
	},
	footerText: {
		color: '#a3a3a3',
		fontSize: '11px',
		lineHeight: '18px',
		letterSpacing: '0.05em',
		textTransform: 'uppercase' as const,
		margin: '0',
	},
	copyrightText: {
		color: '#a3a3a3',
		fontSize: '10px',
		marginTop: '12px',
		margin: '0',
	},
};

export default PaymentFailedEmail;
