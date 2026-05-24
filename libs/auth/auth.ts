import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import Credentials from 'next-auth/providers/credentials';
import { db } from '../firebase/init-firestore';
import { compare } from 'bcrypt-ts';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {
					type: 'email',
					label: 'Email',
					placeholder: 'Email',
				},
				password: {
					type: 'password',
					label: 'Password',
					placeholder: 'Password',
				},
			},
			authorize: async (credentials) => {
				const userSnapshot = await db
					.collection('users')
					.where('email', '==', credentials.email)
					.get();

				if (userSnapshot.empty) {
					return null;
				}

				const user = userSnapshot.docs[0].data();

				const isPasswordCorrect = await compare(
					credentials.password as string,
					user.password,
				);
				if (!isPasswordCorrect) {
					return null;
				}

				return {
					id: userSnapshot.docs[0].id,
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
	session: { strategy: 'jwt' },
	adapter: FirestoreAdapter(db),
});
