import { success } from 'zod';
('use server');

import { signIn } from '@/libs/auth/auth';
import { EmailNotVerifiedError } from '@/libs/auth/auth-errors';
import { db } from '@/libs/firebase/init-firestore';
import { ForgotPasswordSchema, LoginSchema } from '@/schemas/auth.schema';
import {
	sendOathAccountEmail,
	sendResetPassword,
} from '@/services/email-service';
import { generateToken } from '@/utils/generate-token/generate-token';
import { AuthError } from 'next-auth';

type ActionState =
	| { status: 'SUCCESS'; success: boolean }
	| {
			status: 'WRONG_INPUT';
			success: boolean;
			errors: { email?: string[]; password?: string[] };
	  }
	| {
			status: 'UNEXPECTED_ERROR';
			success: boolean;
			message: string;
	  }
	| {
			status: 'NOT_VERIFIED';
			success: boolean;
			message: string;
	  }
	| { status: 'INITIAL'; success: boolean };

export const signInAction = async (
	prevState: ActionState | undefined,
	formData: FormData,
): Promise<ActionState> => {
	const rawData = {
		email: formData.get('email'),
		password: formData.get('password'),
	};
	const signInResult = LoginSchema.safeParse(rawData);
	if (!signInResult.success) {
		return {
			success: false,
			errors: signInResult.error.flatten((error) => error.message).fieldErrors,
			status: 'WRONG_INPUT',
		};
	}
	const { email, password } = signInResult.data;
	try {
		await signIn('credentials', {
			email,
			password,
			redirect: false,
		});
		return { success: true, status: 'SUCCESS' };
	} catch (error) {
		// * IF USER HASN'T VERIFIED ACCOUNT
		if (error instanceof EmailNotVerifiedError) {
			return {
				success: false,
				message: 'Please verify your email first',
				status: 'NOT_VERIFIED',
			};
		}
		// * IF ERROR IS FROM AUTH JS
		else if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						success: false,
						errors: {
							email: ['Wrong email or password'],
							password: ['Wrong email or password'],
						},
						status: 'WRONG_INPUT',
					};
				default:
					return {
						success: false,
						message: 'Something went wrong',
						status: 'UNEXPECTED_ERROR',
					};
			}
		}
		return {
			success: false,
			message: 'Something went wrong',
			status: 'UNEXPECTED_ERROR',
		};
	}
};

type ForgotPasswordState =
	| {
			status: 'SUCCESS';
			success: boolean;
	  }
	| { status: 'WRONG_INPUT'; success: boolean; errors: { email: string[] } }
	| {
			status: 'UNEXPECTED_ERROR';
			success: boolean;
	  };

export const forgotPasswordAction = async (
	email: string,
): Promise<ForgotPasswordState> => {
	try {
		const userSnapshot = await db
			.collection('users')
			.where('email', '==', email)
			.get();

		if (userSnapshot.empty) {
			// *wrong email
			return { success: true, status: 'SUCCESS' };
		}
		const user = userSnapshot.docs[0].data();

		try {
			// * IF user is using a provider for auth
			if (!user.password) {
				await sendOathAccountEmail(user.name, user.email);
				return { success: true, status: 'SUCCESS' };
			}
		} catch (error) {
			return { success: false, status: 'UNEXPECTED_ERROR' };
		}

		try {
			// * GENERATION OF PASSWORD TOKEN
			const validationToken = generateToken();
			const user = userSnapshot.docs[0].data();
			const expiresAt = new Date();
			expiresAt.setHours(expiresAt.getHours() + 24);
			await db.collection('passwordResetTokens').doc(email).set({
				identifier: email,
				token: validationToken,
				expires: expiresAt,
			});
			await sendResetPassword(user.name, user.email, validationToken);
			return { success: true, status: 'SUCCESS' };
		} catch (error) {
			return { success: false, status: 'UNEXPECTED_ERROR' };
		}
	} catch (error) {
		return { success: false, status: 'UNEXPECTED_ERROR' };
	}
};

export const forgotPasswordFormAction = async (
	prevState: ForgotPasswordState | undefined,
	formData: FormData,
): Promise<ForgotPasswordState> => {
	const rawData = {
		email: formData.get('email'),
	};
	const signInResult = ForgotPasswordSchema.safeParse(rawData);
	if (!signInResult.success) {
		return {
			success: false,
			errors: {
				email: signInResult.error.flatten((error) => error.message).fieldErrors
					.email as string[],
			},
			status: 'WRONG_INPUT',
		};
	}
	const { email } = signInResult.data;
	const res = await forgotPasswordAction(email);
	return res;
};
