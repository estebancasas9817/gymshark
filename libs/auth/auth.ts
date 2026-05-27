import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import Credentials from 'next-auth/providers/credentials';
import { db } from '../firebase/init-firestore';
import { compare } from 'bcrypt-ts';
import { authConfig } from '@/auth.config';
import { EmailNotVerifiedError } from './auth-errors';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	adapter: FirestoreAdapter(db),
	callbacks: {
		// * CALLBACK FOR UPDATING THE EMAIL_VERIFIED FIELD WHEN LOGGING WITH GOOGLE PROVIDER
		jwt: async ({ token, account, user }) => {
			if (account?.provider === 'google' && user?.email) {
				await db
					.collection('users')
					.where('email', '==', user.email)
					.get()
					.then((snap) => {
						const hasEmailVerified = snap.docs.find(
							(doc) => doc.data().emailVerified !== null,
						);
						if (!snap.empty && !hasEmailVerified) {
							snap.docs[0].ref.update({ emailVerified: new Date() });
						}
					});
			}
			return token;
		},
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
		Credentials({
			credentials: {
				email: { type: 'email', label: 'Email', placeholder: 'Email' },
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

				if (!user.emailVerified) {
					throw new EmailNotVerifiedError();
				}

				return {
					id: userSnapshot.docs[0].id,
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
});
