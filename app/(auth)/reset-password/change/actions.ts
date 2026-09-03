'use server';

import { db } from '@/libs/firebase/init-firestore';
import z from 'zod';
import { hash } from 'bcrypt-ts';

type ResetPasswordState =
	| { status: 'NO_TOKEN'; success: boolean }
	| { status: 'INITIAL'; success: boolean }
	| {
			status: 'WRONG_INPUT';
			success: boolean;
			errors?: {
				password?: string[];
				confirmPassword?: string[];
			};
	  }
	| { status: 'INVALID'; success: boolean; message: string }
	| { status: 'EXPIRED'; success: boolean; message: string }
	| { status: 'UNEXPECTED_ERROR'; success: boolean; message: string }
	| { status: 'SUCCESS'; success: boolean; message: string };

const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: 'The password must have at least 8 characters' })
			.max(20, { message: `The password can't have more than 20 characters` }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const resetPasswordAction = async (
	email: string,
	token: string,
	prevState: ResetPasswordState,
	formData: FormData,
): Promise<ResetPasswordState> => {
	if (!email || !token) {
		return {
			status: 'NO_TOKEN',
			success: false,
		};
	}
	const rawData = {
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	};
	const result = resetPasswordSchema.safeParse(rawData);
	if (!result.success) {
		return {
			success: false,
			errors: result.error.flatten((error) => error.message).fieldErrors,
			status: 'WRONG_INPUT',
		};
	}
	const { password } = result.data;
	try {
		const verifyQuery = db.collection('passwordResetTokens').doc(email);
		const verificationTokenSnap = await verifyQuery.get();
		const data = verificationTokenSnap.data();
		if (!verificationTokenSnap.exists || !data) {
			return {
				status: 'INVALID',
				success: false,
				message:
					'The link you followed is invalid or has already been used. Please request a new password reset.',
			};
		}

		const { token: dbToken, expires } = data;

		const isEqualToken = token === dbToken;
		const hasExpired = expires.toDate() < new Date();
		if (!isEqualToken || hasExpired) {
			const status = !isEqualToken ? 'INVALID' : 'EXPIRED';
			const message = !isEqualToken
				? 'The link you followed is invalid or has already been used. Please request a new password reset.'
				: 'This password reset link is no longer valid. Please go back and request a new one.';
			return {
				status,
				success: false,
				message,
			};
		}
		await verifyQuery.delete();
		try {
			const hashedPassword = await hash(password, 10);
			const userQuery = db.collection('users').doc(email);
			await userQuery.update({
				password: hashedPassword,
			});
			return {
				success: true,
				status: 'SUCCESS',
				message:
					'Your password has been successfully reset. You can now log in with your new credentials.',
			};
		} catch (error) {
			return {
				success: false,
				status: 'UNEXPECTED_ERROR',
				message:
					'An unexpected error occurred on our end. Please try again in a few moments.',
			};
		}
	} catch (error) {
		return {
			success: false,
			status: 'UNEXPECTED_ERROR',
			message:
				'An unexpected error occurred on our end. Please try again in a few moments.',
		};
	}
};
