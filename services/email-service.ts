'use server';

import PurchaseConfirmationEmail, {
	OrderItem,
} from '@/emails/purchase-confirmation-email';
import VerifyAccountEmail from '@/emails/verify-account-email';
import { resend } from '@/libs/resend/resend';

interface SendVerificationEmailParams {
	email: string;
	name: string;
	token: string;
}

export async function sendVerificationEmail({
	email,
	name,
	token,
}: SendVerificationEmailParams) {
	const baseUrl =
		process.env.NODE_ENV === 'production'
			? process.env.APP_URL
			: process.env.APP_LOCAL_URL;
	const verificationUrl = `${baseUrl}/verify-account?token=${token}&email=${encodeURIComponent(email)}`;

	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <onboarding@resend.dev>',
			to: email,
			subject: 'Verify your Gymshark Account',
			react: VerifyAccountEmail({ name, url: verificationUrl }),
		});

		return { success: true, data };
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error('Error sending verification email', { cause: error });
	}
}

export interface PurchaseConfirmationEmailProps {
	name?: string;
	email: string;
	orderNumber?: string;
	orderDate?: string;
	items?: OrderItem[];
	subtotal?: number;
	shipping?: number;
	tax?: number;
	total?: number;
	shippingAddress?: {
		fullName: string;
		line1: string;
		line2?: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	};
	trackingUrl?: string;
}

export async function sendOrderEmail({
	email,
	name,
	total,
	items,
	orderDate,
	orderNumber,
	subtotal,
	tax,
	shipping,
	shippingAddress,
}: PurchaseConfirmationEmailProps) {
	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <onboarding@resend.dev>',
			to: email,
			subject: `Order Confirmed ${orderNumber}`,
			react: PurchaseConfirmationEmail({
				name,
				email,
				total,
				items,
				orderDate,
				orderNumber,
				subtotal,
				tax,
				shipping,
				shippingAddress,
			}),
		});

		return { success: true, data };
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error('Error sending verification email', { cause: error });
	}
}
