'use server';

import { db } from '@/libs/firebase/init-firestore';
import { sendVerificationEmail } from '@/services/email-service';
import { generateToken } from '@/utils/generate-token/generate-token';

type VerifyStatus =
	| 'verifying'
	| 'success'
	| 'expired'
	| 'invalid'
	| 'no_token';

type VerifyAccountActionResponse = {
	status: VerifyStatus;
};

export const verifyAccountAction = async (
	email?: string,
	token?: string,
): Promise<VerifyAccountActionResponse> => {
	if (!email || !token) {
		return {
			status: 'no_token',
		};
	}
	try {
		const verifyQuery = db.collection('verificationTokens').doc(email);
		const verificationTokenSnap = await verifyQuery.get();

		if (!verificationTokenSnap.exists) {
			return {
				status: 'invalid',
			};
		}

		const data = verificationTokenSnap.data();
		if (!data) {
			return {
				status: 'invalid',
			};
		}

		const { token: dbToken, expires } = data;

		const isEqualToken = token === dbToken;
		const hasExpired = expires.toDate() < new Date();

		if (!isEqualToken || hasExpired) {
			const status = !isEqualToken ? 'invalid' : 'expired';
			return {
				status,
			};
		}

		const userQuery = db.collection('users').doc(email);
		await userQuery.update({
			emailVerified: new Date(),
		});

		await verifyQuery.delete();

		return {
			status: 'success',
		};
	} catch (error) {
		console.error('Error exacto en verifyAccountAction:', error);
		return {
			status: 'invalid',
		};
	}
};

type ResendTokenActionResponse = {
	status: boolean;
};

export const resendTokenAction = async (
	email: string,
): Promise<ResendTokenActionResponse> => {
	try {
		let name: string;
		const userQuery = await db.collection('users').doc(email).get();
		const { firstName = 'Atlete', emailVerified = null } =
			userQuery.data() ?? {};
		name = firstName;

		// * IF EMAIL IS ALREADY VERIFIED OR IS UNDEFINED
		if (!!emailVerified || !userQuery.exists) {
			return {
				status: false,
			};
		}

		const validationToken = generateToken();
		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 24);
		const verificationQuery = db.collection('verificationTokens').doc(email);
		await verificationQuery.set({
			identifier: email,
			token: validationToken,
			expires: expiresAt,
		});

		await sendVerificationEmail({
			email,
			name,
			token: validationToken,
		});
		return {
			status: true,
		};
	} catch (error) {
		return {
			status: false,
		};
	}
};
