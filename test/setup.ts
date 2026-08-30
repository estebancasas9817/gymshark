import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

vi.mock('@/libs/firebase/init-firestore', () => ({
	db: {},
}));

vi.mock('@/libs/auth/auth', () => ({
	auth: vi.fn(),
	signIn: vi.fn(),
	signOut: vi.fn(),
}));

vi.mock('@/libs/stripe/init-stripe', () => ({
	stripe: {
		checkout: {
			sessions: {
				create: vi.fn(),
			},
		},
		webhooks: {
			constructEvent: vi.fn(),
		},
	},
}));

vi.mock('*.css', () => ({}));
vi.mock('*.module.css', () => ({}));
