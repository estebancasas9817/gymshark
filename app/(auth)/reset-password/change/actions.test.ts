import { resetPasswordAction } from './actions';

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
	const mockDoc = vi
		.fn()
		.mockReturnValue({ get: mockGet, delete: vi.fn(), update: mockUpdate });
	const mockCollection = vi.fn().mockReturnValue({ doc: mockDoc });

	return { mockCollection, mockDoc, mockGet };
});

vi.mock('@/libs/firebase/init-firestore', () => ({
	db: {
		collection: mockCollection,
	},
}));
describe('resetPasswordAction', () => {
	it('resetPasswordAction should return with an status of WRONG_INPUT if the email is not in the right format', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		expect(
			await resetPasswordAction(
				'email',
				'token',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			errors: {
				confirmPassword: ['Invalid input: expected string, received null'],
			},
			status: 'WRONG_INPUT',
			success: false,
		});
	});

	it('resetPasswordAction should return with an status of NO_TOKEN if the email or the token does not exists', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			status: 'NO_TOKEN',
			success: false,
		});
	});

	it('resetPasswordAction should return with an status of WRONG_INPUT if the password and the confirmedPassword does not match', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('confirmPassword', 'another');
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'token',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			errors: {
				confirmPassword: [`Passwords don't match`],
			},
			status: 'WRONG_INPUT',
			success: false,
		});
	});

	it('resetPasswordAction should return with an status of UNEXPECTED_ERROR if an unxpected error occured', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('confirmPassword', 'password');
		mockGet.mockResolvedValue(null);
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'token',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			message:
				'An unexpected error occurred on our end. Please try again in a few moments.',
			status: 'UNEXPECTED_ERROR',
			success: false,
		});
	});

	it('resetPasswordAction should return with an status of INVALID if verificationToken or data does not exists', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('confirmPassword', 'password');
		mockGet.mockResolvedValue({
			exists: true,
			data: () => null,
		});
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'token',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			message:
				'The link you followed is invalid or has already been used. Please request a new password reset.',
			status: 'INVALID',
			success: false,
		});
	});
	it('resetPasswordAction should return with an status of INVALID if token does not match with the token from db', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('confirmPassword', 'password');
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'token',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			message:
				'The link you followed is invalid or has already been used. Please request a new password reset.',
			status: 'INVALID',
			success: false,
		});
	});

	it('resetPasswordAction should return with an status of EXPIRED if token already expired', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('confirmPassword', 'password');
		mockGet.mockResolvedValue({
			exists: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2025-12-31T23:59:59Z'),
				},
			}),
		});
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'123456',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			message:
				'This password reset link is no longer valid. Please go back and request a new one.',
			status: 'EXPIRED',
			success: false,
		});
	});

	it('resetPasswordAction should return with an status of SUCCESS if password was successfully reset', async () => {
		const formData = new FormData();
		formData.append('password', 'password');
		formData.append('confirmPassword', 'password');
		mockGet.mockResolvedValue({
			exists: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2026-12-31T23:59:59Z'),
				},
			}),
		});
		expect(
			await resetPasswordAction(
				'email@gmail.com',
				'123456',
				{ status: 'SUCCESS', success: true, message: '' },
				formData,
			),
		).toStrictEqual({
			message:
				'Your password has been successfully reset. You can now log in with your new credentials.',
			status: 'SUCCESS',
			success: true,
		});
	});
});
