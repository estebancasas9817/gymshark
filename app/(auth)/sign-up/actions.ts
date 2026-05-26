'use server';

import { db } from '@/libs/firebase/init-firestore';
import { sendVerificationEmail } from '@/services/email-service';
import { generateToken } from '@/utils/generate-token/generate-token';
import { hash } from 'bcrypt-ts';
import { z } from 'zod';

type ActionState = {
	message?: string | null;
	success?: boolean;
	errors?: {
		email?: string[];
		password?: string[];
		firstName?: string[];
		lastName?: string[];
	};
};

const userRegisterSchema = z.object({
	email: z.email({ message: 'The format of the email is not valid' }),
	password: z
		.string()
		.min(8, { message: 'The password must have at least 8 characters' })
		.max(15, { message: `The password can't have more than 15 characters` }),
	firstName: z
		.string()
		.trim()
		.min(1, { message: 'The first name is required' })
		.max(30, { message: `The first name can't have more than 30 characters` }),

	lastName: z
		.string()
		.trim()
		.min(1, { message: 'The last name is required' })
		.max(30, { message: `The first name can't have more than 30 characters` }),
});

export const SignUpAction = async (
	prevState: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const rawData = {
		firstName: formData.get('firstName'),
		email: formData.get('email'),
		password: formData.get('password'),
		lastName: formData.get('lastName'),
	};
	const signUpResult = userRegisterSchema.safeParse(rawData);
	// * SCHEMA NOT VALID
	if (!signUpResult.success) {
		return {
			success: false,
			errors: signUpResult.error.flatten((error) => error.message).fieldErrors,
		};
	}
	const { firstName, email, password, lastName } = signUpResult.data;

	const query = db.collection('users').doc(email);
	try {
		// * CHECKING IF USER ALREADY EXISTS
		const snap = await query.get();
		if (snap.exists) {
			return {
				success: false,
				message: 'User with that email already exists',
			};
		}
	} catch (error) {
		return {
			success: false,
			message: 'Error creating the user, please try again',
		};
	}

	try {
		// * HASHING PASSWORD AND SETTING NEW USER
		const hashedPassword = await hash(password, 10);
		await db.collection('users').doc(email).set({
			email,
			password: hashedPassword,
			emailVerified: null,
			firstName,
			lastName,
		});
	} catch (error) {
		return {
			success: false,
			message: 'Error creating the user, please try again',
		};
	}

	try {
		// * GENERATING TOKEN AND SENDING VERIFICATION EMAIL
		const validationToken = generateToken();
		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 24);
		await db.collection('verificationTokens').doc(email).set({
			identifier: email,
			token: validationToken,
			expires: expiresAt,
		});
		try {
			await sendVerificationEmail({
				email,
				name: firstName,
				token: validationToken,
			});
		} catch (error) {
			console.warn(
				'User created but verification email failed to send.',
				error,
			);
			return {
				success: true,
				message: 'Email could not be sent',
			};
		}

		return {
			success: true,
			message: 'Please check your email to verify your account.',
		};
	} catch (error) {
		return {
			success: false,
			message: 'Sorry something happened, please try again',
		};
	}
};
