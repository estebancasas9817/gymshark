import { Timestamp } from 'firebase-admin/firestore';

export type User = {
	name: string;
	lastName: string;
	email: string;
	password: string;
	emailVerified: Timestamp | Date | null;
};
