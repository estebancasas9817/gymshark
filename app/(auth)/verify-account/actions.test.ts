import { verifyAccountAction } from './actions';

vi.mock('@/libs/resend/resend', () => ({
	resend: {
		emails: {
			send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
		},
	},
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

describe('verifyAccountAction', () => {
	it('should return status of no_token if token does not exists', async () => {
		expect(await verifyAccountAction('email', '')).toStrictEqual({
			status: 'no_token',
		});
	});

	it('should return status of invalid if token is invalid', async () => {
		expect(await verifyAccountAction('email', 'token')).toStrictEqual({
			status: 'invalid',
		});
	});

	it('should return status of invalid  if isEqualToken is false', async () => {
		mockGet.mockResolvedValue({
			exists: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2026-12-31T23:59:59Z'),
				},
			}),
		});
		expect(await verifyAccountAction('email', 'token')).toStrictEqual({
			status: 'invalid',
		});
	});

	it('should return status of expired if token expired', async () => {
		mockGet.mockResolvedValue({
			exists: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2025-12-31T23:59:59Z'),
				},
			}),
		});
		expect(await verifyAccountAction('email', '123456')).toStrictEqual({
			status: 'expired',
		});
	});

	it('should return status of expired if token expired', async () => {
		mockGet.mockResolvedValue({
			exists: true,
			data: () => ({
				token: '123456',
				expires: {
					toDate: () => new Date('2026-12-31T23:59:59Z'),
				},
			}),
		});
		expect(await verifyAccountAction('email', '123456')).toStrictEqual({
			status: 'success',
		});
	});
});
