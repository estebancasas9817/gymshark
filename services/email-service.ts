'use server';

import OAuthAccountEmail from '@/emails/oath-account-email';
import PaymentFailedEmail from '@/emails/payment-failed-email';
import PurchaseConfirmationEmail from '@/emails/purchase-confirmation-email';
import ResetPassword from '@/emails/reset-password';
import VerifyAccountEmail from '@/emails/verify-account-email';
import { OrderLineItem } from '@/libs/firebase/db/orders/create-order';
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
			? process.env.NEXT_PUBLIC_APP_URL
			: process.env.LOCAL_URL;
	const verificationUrl = `${baseUrl}/verify-account?token=${token}&email=${encodeURIComponent(email)}`;

	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <noreply@gymshark-clone.dev>',
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
	items?: OrderLineItem[];
	subtotal?: number;
	shipping?: number;
	tax?: number;
	total?: number;
}

export async function sendSuccessOrderEmail({
	email,
	name,
	total,
	items,
	orderDate,
	orderNumber,
	subtotal,
	tax,
	shipping,
}: PurchaseConfirmationEmailProps) {
	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <noreply@gymshark-clone.dev>',
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
			}),
		});

		return { success: true, data };
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error('Error sending verification email', { cause: error });
	}
}

export async function sendFailOrderEmail(name: string, email: string) {
	const baseUrl =
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_APP_URL
			: process.env.LOCAL_URL;

	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <noreply@gymshark-clone.dev>',
			to: email,
			subject: `Order Failed`,
			react: PaymentFailedEmail({ name, url: baseUrl as string }),
		});

		return { success: true, data };
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error('Error sending verification email', { cause: error });
	}
}

export async function sendResetPassword(
	name: string,
	email: string,
	token: string,
) {
	const baseUrl =
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_APP_URL
			: process.env.LOCAL_URL;
	const verificationUrl = `${baseUrl}/reset-password/change?token=${token}&email=${encodeURIComponent(email)}`;

	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <noreply@gymshark-clone.dev>',
			to: email,
			subject: `Order Failed`,
			react: ResetPassword({
				userFirstname: name,
				resetUrl: verificationUrl as string,
			}),
		});

		return { success: true, data };
	} catch (error) {
		console.error('Error sending reseting password email:', error);
		throw new Error('Error sending reseting password email', { cause: error });
	}
}

export async function sendOathAccountEmail(name: string, email: string) {
	const baseUrl =
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_APP_URL
			: process.env.LOCAL_URL;
	const verificationUrl = `${baseUrl}/sign-in`;

	try {
		const data = await resend.emails.send({
			from: 'Gymshark Clone <noreply@gymshark-clone.dev>',
			to: email,
			subject: `Order Failed`,
			react: OAuthAccountEmail({
				userFirstname: name,
				userEmail: email,
				loginUrl: verificationUrl,
			}),
		});

		return { success: true, data };
	} catch (error) {
		console.error('Error sending reseting password email:', error);
		throw new Error('Error sending reseting password email', { cause: error });
	}
}
