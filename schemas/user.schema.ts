import z from 'zod';

export const UserSchema = z.object({
	email: z
		.email({ message: 'The format of the email is not valid' })
		.trim()
		.toLowerCase(),
	emailVerified: z.coerce.date().nullish(),
	lastName: z
		.string()
		.trim()
		.toLowerCase()
		.min(2, { message: 'Last Name should have at least two characters' })
		.max(50),
	password: z
		.string()
		.min(3, { message: 'Password must have at least 3 characters' })
		.max(20),
	name: z
		.string()
		.trim()
		.min(1, { message: 'The first name is required' })
		.max(30, { message: `The first name can't have more than 30 characters` }),
});
