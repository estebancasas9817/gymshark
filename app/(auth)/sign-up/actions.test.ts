import { SignUpAction } from './actions';
import { hash } from 'bcrypt-ts';

vi.mock('bcrypt-ts', () => ({
	hash: vi.fn(),
}));
const { mockCollection, mockGet } = vi.hoisted(() => {
	const mockGet = vi.fn().mockResolvedValue({
		exists: true,
		data: () => ({
			token: '123456',
			expires: {
				toDate: () => new Date('2026-12-31T23:59:59Z'),
			},
		}),
	});
	const mockUpdate = vi.fn().mockResolvedValue(true);
	const mockWhere = vi.fn().mockReturnValue({
		get: mockGet,
	});
	const mockDoc = vi.fn().mockReturnValue({
		get: mockGet,
		delete: vi.fn(),
		update: mockUpdate,
		set: vi.fn(),
	});
	const mockCollection = vi
		.fn()
		.mockReturnValue({ doc: mockDoc, where: mockWhere });

	return { mockCollection, mockDoc, mockGet, mockWhere };
});

vi.mock('@/libs/resend/resend', () => ({
	resend: {
		emails: {
			send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
		},
	},
}));

vi.mock('@/libs/firebase/init-firestore', () => ({
	db: {
		collection: mockCollection,
	},
}));

describe('SignUpAction', () => {
	it('should return status of WRONG_INPUT if input data is in wrong format', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('email', 'something');
		expect(await SignUpAction({ status: 'INITIAL' }, formData)).toStrictEqual({
			errors: {
				email: ['The format of the email is not valid'],
				lastName: ['Invalid input: expected string, received null'],
				name: ['Invalid input: expected string, received null'],
			},
			status: 'WRONG_INPUT',
			success: false,
		});
	});
	it('should return status of USER_ALREADY_EXISTS if user already exists', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('name', 'Esteban');
		formData.append('lastName', 'Casas');
		formData.append('email', 'e@gmail.com');
		expect(await SignUpAction({ status: 'INITIAL' }, formData)).toStrictEqual({
			message: 'User with that email already exists',
			status: 'USER_ALREADY_EXISTS',
			success: false,
		});
	});
	it('should return status of SUCCESS if sign up was successfull', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('name', 'Esteban');
		formData.append('lastName', 'Casas');
		formData.append('email', 'e@gmail.com');
		mockGet.mockResolvedValue({
			exists: true,
			empty: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2026-12-31T23:59:59Z'),
				},
			}),
		});
		vi.mocked(hash).mockResolvedValue('hashedPsw');

		expect(await SignUpAction({ status: 'INITIAL' }, formData)).toStrictEqual({
			message: 'Please check your email to verify your account.',
			status: 'SUCCESS',
			success: true,
		});
	});

	it('should return status of UNEXPECTED_ERROR if an error occurs', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('name', 'Esteban');
		formData.append('lastName', 'Casas');
		formData.append('email', 'e@gmail.com');
		mockGet.mockResolvedValue({
			exists: true,
			empty: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2026-12-31T23:59:59Z'),
				},
			}),
		});
		vi.mocked(hash).mockRejectedValue(new Error('error'));

		expect(await SignUpAction({ status: 'INITIAL' }, formData)).toStrictEqual({
			message: 'Error creating the user, please try again',
			status: 'UNEXPECTED_ERROR',
			success: false,
		});
	});
});
