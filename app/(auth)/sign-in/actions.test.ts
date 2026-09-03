import { signIn } from '@/libs/auth/auth';
import { signInAction } from './actions';
const { mockCollection } = vi.hoisted(() => {
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
	const mockDoc = vi
		.fn()
		.mockReturnValue({ get: mockGet, delete: vi.fn(), update: mockUpdate });
	const mockCollection = vi.fn().mockReturnValue({ doc: mockDoc });

	return { mockCollection, mockDoc, mockGet };
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

vi.mock('@/libs/auth/auth', () => ({
	signIn: vi.fn(),
}));

describe('signInAction', () => {
	it('should return WRONG_INPUT if the format data is incorrect', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('email', 'something');

		expect(
			await signInAction({ status: 'INITIAL', success: true }, formData),
		).toStrictEqual({
			errors: {
				email: ['The format of the email is not valid'],
			},
			status: 'WRONG_INPUT',
			success: false,
		});
	});
	it('should return SUCCESS if sign in was successfull', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('email', 'e@gmail.com');

		expect(
			await signInAction({ status: 'INITIAL', success: true }, formData),
		).toStrictEqual({
			status: 'SUCCESS',
			success: true,
		});
	});
	it('should return UNEXPECTED_ERROR if sign in was not successfull', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('email', 'e@gmail.com');
		vi.mocked(signIn).mockRejectedValue(new Error('error'));
		expect(
			await signInAction({ status: 'INITIAL', success: true }, formData),
		).toStrictEqual({
			message: 'Something went wrong',
			status: 'UNEXPECTED_ERROR',
			success: false,
		});
	});
});
