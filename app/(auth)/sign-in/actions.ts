'use server';

import { signIn } from '@/libs/auth/auth';
import { EmailNotVerifiedError } from '@/libs/auth/auth-errors';
import { AuthError } from 'next-auth';
import { z } from 'zod';

type ActionState = {
	message?: string;
	success?: boolean;
	errors?: {
		email?: string[];
		password?: string[];
	};
	status?: 'UNEXPECTED_ERROR' | 'WRONG_INPUT' | 'NOT_VERIFIED';
};

const loginSchema = z.object({
	email: z.email({ message: 'The format of the email is not valid' }),
	password: z.string(),
});
export const signInAction = async (
	prevState: ActionState | undefined,
	formData: FormData,
): Promise<ActionState | undefined> => {
	const rawData = {
		email: formData.get('email'),
		password: formData.get('password'),
	};
	const signInResult = loginSchema.safeParse(rawData);
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
			redirectTo: '/account',
		});
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
						message: 'Wrong email or password',
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
		// * IF LOGIN WAS SUCCESSFULL NEXT REDIRECTS TO /my-account
		// ! EVEN WITH A SUCCESSFULL LOGIN, IT WILL ENTER THE CATCH BLOCK AND NEXT UNDER THE HOOK REDIRECTS, THERE IS NO NEED TO ADD A SUCCESS RETURN IN THE TRY BLOCK, SINCE IT WILL ALWAYS ENTER THE CATCH BLOCK

		throw error;
	}
};
