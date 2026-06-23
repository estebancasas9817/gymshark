import { PurchaseConfirmationEmailProps } from '@/services/email-service';
import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Text,
	Heading,
	Hr,
	Row,
	Column,
} from '@react-email/components';
import * as React from 'react';

export interface OrderItem {
	name: string;
	variant: string; // e.g. "Black / L"
	quantity: number;
	unitPrice: number;
}

const formatCurrency = (amount: number) =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
		amount,
	);

export default function PurchaseConfirmationEmail({
	name = 'Athlete',
	orderNumber = 'GS-20241215-8842',
	orderDate = 'December 15, 2024',
	items,
	subtotal = 138,
	shipping = 0,
	tax = 11.04,
	total = 149.04,
}: PurchaseConfirmationEmailProps) {
	return (
		<Html lang="en">
			<Head />
			<Preview>
				Your Gymshark order #{orderNumber} is confirmed — thanks for your
				purchase!
			</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header */}
					<Section style={headerSection}>
						<Heading style={logoText}>GYMSHARK CLONE</Heading>
					</Section>

					{/* Body */}
					<Section style={contentSection}>
						{/* Confirmed badge */}
						<Section style={badgeContainer}>
							<Text style={badgeText}>✓ &nbsp;ORDER CONFIRMED</Text>
						</Section>

						<Heading style={welcomeHeading}>
							THANKS, {name.toUpperCase()}!
						</Heading>

						<Text style={paragraph}>
							Your order has been received and is being processed. You'll
							receive a shipping confirmation with tracking info once your items
							are on their way.
						</Text>

						{/* Order summary box */}
						<Section style={summaryBox}>
							{/* Order meta */}
							<Row>
								<Column>
									<Text style={metaLabel}>ORDER</Text>
									<Text style={metaValue}>
										#{orderNumber.slice(-8).toUpperCase()}
									</Text>
								</Column>
								<Column style={{ textAlign: 'right' }}>
									<Text style={metaLabel}>DATE</Text>
									<Text style={metaValue}>{orderDate}</Text>
								</Column>
							</Row>

							<Hr style={innerDivider} />

							{/* Line items */}
							{items?.map((item, index) => (
								<Row key={index} style={itemRow}>
									<Column>
										<Text style={itemName}>{item.name}</Text>
										<Text style={itemMeta}>
											{item.color} × {item.quantity}
										</Text>
									</Column>
									<Column style={{ textAlign: 'right' }}>
										<Text style={itemPrice}>
											{formatCurrency(item.unitPrice * item.quantity)}
										</Text>
									</Column>
								</Row>
							))}

							<Hr style={innerDivider} />

							{/* Totals */}
							<Row style={totalRow}>
								<Column>
									<Text style={totalLabel}>Subtotal</Text>
								</Column>
								<Column style={{ textAlign: 'right' }}>
									<Text style={totalLabel}>{formatCurrency(subtotal)}</Text>
								</Column>
							</Row>
							<Row style={totalRow}>
								<Column>
									<Text style={totalLabel}>Shipping</Text>
								</Column>
								<Column style={{ textAlign: 'right' }}>
									<Text style={totalLabel}>
										{shipping === 0 ? 'Free' : formatCurrency(shipping)}
									</Text>
								</Column>
							</Row>
							<Row style={totalRow}>
								<Column>
									<Text style={totalLabel}>Tax</Text>
								</Column>
								<Column style={{ textAlign: 'right' }}>
									<Text style={totalLabel}>{formatCurrency(tax)}</Text>
								</Column>
							</Row>
							<Hr style={innerDivider} />
							<Row>
								<Column>
									<Text style={grandTotalLabel}>TOTAL</Text>
								</Column>
								<Column style={{ textAlign: 'right' }}>
									<Text style={grandTotalLabel}>{formatCurrency(total)}</Text>
								</Column>
							</Row>
						</Section>
						<Text style={paragraph}>
							Questions about your order? Our support team is available 24/7 —
							just reply to this email or visit our help center.
						</Text>
					</Section>

					{/* Footer */}
					<Section style={footerSection}>
						<Text style={footerSecondary}>
							© {new Date().getFullYear()} Gymshark Ltd. All rights reserved.
						</Text>
						<Text style={cloneBadge}>
							This email was sent from a <strong>Gymshark Clone</strong>{' '}
							development environment.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

/* ─── Styles ─────────────────────────────────────────────────────────────── */

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

const badgeContainer = {
	display: 'inline-block',
	backgroundColor: '#f0faf4',
	border: '1px solid #b6e8cc',
	borderRadius: '4px',
	padding: '6px 14px',
	marginBottom: '20px',
};

const badgeText = {
	color: '#15803d',
	fontSize: '12px',
	fontWeight: '700',
	letterSpacing: '1px',
	margin: '0',
};

const welcomeHeading = {
	color: '#111111',
	fontSize: '22px',
	fontWeight: '800',
	letterSpacing: '0.5px',
	margin: '0 0 16px 0',
};

const paragraph = {
	color: '#444444',
	fontSize: '15px',
	lineHeight: '24px',
	margin: '0 0 24px 0',
};

const summaryBox = {
	backgroundColor: '#f9f9f9',
	border: '1px solid #eeeeee',
	borderRadius: '4px',
	padding: '20px',
	marginBottom: '20px',
};

const metaLabel = {
	color: '#999999',
	fontSize: '11px',
	fontWeight: '700',
	letterSpacing: '1px',
	textTransform: 'uppercase' as const,
	margin: '0 0 4px 0',
};

const metaValue = {
	color: '#111111',
	fontSize: '13px',
	fontWeight: '700',
	margin: '0',
};

const innerDivider = {
	borderColor: '#eeeeee',
	margin: '12px 0',
};

const itemRow = {
	padding: '8px 0',
};

const itemName = {
	color: '#111111',
	fontSize: '13px',
	fontWeight: '700',
	margin: '0 0 2px 0',
};

const itemMeta = {
	color: '#888888',
	fontSize: '12px',
	margin: '0',
};

const itemPrice = {
	color: '#111111',
	fontSize: '13px',
	fontWeight: '700',
	margin: '0',
};

const totalRow = {
	padding: '2px 0',
};

const totalLabel = {
	color: '#555555',
	fontSize: '13px',
	margin: '0',
};

const grandTotalLabel = {
	color: '#111111',
	fontSize: '15px',
	fontWeight: '800',
	margin: '0',
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
