import { initFirestore } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';

export const db = initFirestore({
	credential: cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_EMAIL_ID,
		privateKey: process.env.FIREBASE_API_KEY?.replace(/\\n/g, '\n'),
	}),
});
