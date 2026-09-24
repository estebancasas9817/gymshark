import { db } from '../../init-firestore';

export interface UserDocument {
	email: string;
	lastName: string;
	name: string;
}

export async function getUser(
	identifier: string,
): Promise<UserDocument | null> {
	try {
		const userDocRef = db.collection('users').doc(identifier);
		const docSnap = await userDocRef.get();

		if (!docSnap.exists) return null;

		const data = docSnap.data();
		if (!data) return null;
		const { emailVerified, password, ...rest } = data;

		return {
			...rest,
		} as UserDocument;
	} catch (error) {
		console.error('Error fetching user from Firestore:', error);
		throw new Error('Failed to fetch user');
	}
}
