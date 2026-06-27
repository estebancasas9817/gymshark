'use server';

import { db } from '@/libs/firebase/init-firestore';
import z from 'zod';
import { hash } from 'bcrypt-ts';

type ResetPasswordState = {
	message?: string;
	success?: boolean;
	errors?: {
		password?: string[];
	};
	status?:
		| 'UNEXPECTED_ERROR'
		| 'WRONG_INPUT'
		| 'SUCCESS'
		| 'INVALID'
		| 'NO_TOKEN'
		| 'EXPIRED';
};

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

		if (!verificationTokenSnap.exists) {
			return {
				status: 'INVALID',
				success: false,
			};
		}

		const data = verificationTokenSnap.data();
		if (!data) {
			return {
				status: 'INVALID',
				success: false,
			};
		}

		const { token: dbToken, expires } = data;

		const isEqualToken = token === dbToken;
		const hasExpired = expires.toDate() < new Date();

		if (!isEqualToken || hasExpired) {
			const status = !isEqualToken ? 'INVALID' : 'EXPIRED';
			return {
				status,
				success: false,
			};
		}
		await verifyQuery.delete();

		try {
			const hashedPassword = await hash(password, 10);
			const userQuery = db.collection('users').doc(email);
			await userQuery.update({
				password: hashedPassword,
			});
			return { success: true, status: 'SUCCESS' };
		} catch (error) {
			return { success: false, status: 'UNEXPECTED_ERROR' };
		}
	} catch (error) {
		return { success: false, status: 'UNEXPECTED_ERROR' };
	}
};
