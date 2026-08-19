'use server';

import { db } from '@/libs/firebase/init-firestore';
import { RegisterSchema } from '@/schemas/auth.schema';
import { sendVerificationEmail } from '@/services/email-service';
import { generateToken } from '@/utils/generate-token/generate-token';
import { hash } from 'bcrypt-ts';

type ActionState =
	| {
			status: 'INITIAL';
	  }
	| {
			status: 'SUCCESS';
			success: boolean;
			message: string;
	  }
	| {
			status: 'WRONG_INPUT';
			success: boolean;
			errors: {
				email?: string[];
				password?: string[];
				name?: string[];
				lastName?: string[];
			};
	  }
	| {
			status: 'UNEXPECTED_ERROR';
			success: boolean;
			message: string;
	  }
	| {
			status: 'USER_ALREADY_EXISTS';
			success: boolean;
			message: string;
	  };

export const SignUpAction = async (
	prevState: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const rawData = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		lastName: formData.get('lastName'),
	};
	const signUpResult = RegisterSchema.safeParse(rawData);
	// * SCHEMA NOT VALID
	if (!signUpResult.success) {
		return {
			status: 'WRONG_INPUT',
			success: false,
			errors: signUpResult.error.flatten((error) => error.message).fieldErrors,
		};
	}
	const { name, email, password, lastName } = signUpResult.data;

	const query = db.collection('users').where('email', '==', email);
	try {
		// * CHECKING IF USER ALREADY EXISTS
		const snap = await query.get();

		if (!snap.empty) {
			return {
				status: 'USER_ALREADY_EXISTS',
				success: false,
				message: 'User with that email already exists',
			};
		}
	} catch (error) {
		return {
			status: 'UNEXPECTED_ERROR',
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
			name,
			lastName,
		});
	} catch (error) {
		return {
			status: 'UNEXPECTED_ERROR',
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
				name,
				token: validationToken,
			});
		} catch (error) {
			console.warn(
				'User created but verification email failed to send.',
				error,
			);
			return {
				status: 'SUCCESS',
				success: true,
				message: 'Email could not be sent',
			};
		}

		return {
			status: 'SUCCESS',
			success: true,
			message: 'Please check your email to verify your account.',
		};
	} catch (error) {
		return {
			status: 'UNEXPECTED_ERROR',
			success: false,
			message: 'Sorry something happened, please try again',
		};
	}
};
