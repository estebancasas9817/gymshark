import { Timestamp } from 'firebase-admin/firestore';

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	emailVerified: Timestamp | Date | null;
};
