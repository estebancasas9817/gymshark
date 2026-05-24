'use server';

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
