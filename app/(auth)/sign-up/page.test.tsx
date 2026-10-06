import { render, screen } from '@testing-library/react';
import Page from './page';
import { useTranslations } from 'next-intl';
import userEvent from '@testing-library/user-event';
import { SignUpAction } from './actions';

const mockUpdate = vi.fn().mockResolvedValue({});
vi.mock('next-auth/react', () => ({
	useSession: () => ({
		update: mockUpdate,
	}),
}));
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));
vi.mock('./actions', () => ({
	SignUpAction: vi.fn(),
}));

vi.mock('next-intl');
const tMock = Object.assign(vi.fn((key: string) => key));
vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);

const renderComp = () => {
	render(<Page />);
};

describe('Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUpdate.mockResolvedValue({});
	});
	it('should call SignUpAction if user clicks on submit ', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(SignUpAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
			message: 'success',
		});
		renderComp();
		await user.type(screen.getByText('form.first_name_label'), 'Esteban');
		await user.type(screen.getByText('form.last_name_label'), 'Casas');
		await user.type(screen.getByText('form.email_label'), 'e@gmail.com');
		await user.type(screen.getByText('form.password_label'), 'password');

		await user.click(
			screen.getByRole('button', { name: 'form.submit_button' }),
		);
		expect(SignUpAction).toHaveBeenCalled();
	});

	it('should display text of error if action throws error', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(SignUpAction).mockResolvedValue({
			status: 'UNEXPECTED_ERROR',
			success: false,
			message: 'Unexpected Error',
		});
		renderComp();
		await user.type(screen.getByText('form.first_name_label'), 'Esteban');
		await user.type(screen.getByText('form.last_name_label'), 'Casas');
		await user.type(screen.getByText('form.email_label'), 'e@gmail.com');
		await user.type(screen.getByText('form.password_label'), 'password');

		await user.click(
			screen.getByRole('button', { name: 'form.submit_button' }),
		);
		expect(screen.getByText(/Unexpected Error/)).toBeInTheDocument();
	});

	it('should not call SignUpAction if user clicks on submit but without the inputs', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(SignUpAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
			message: 'success',
		});
		renderComp();
		await user.click(
			screen.getByRole('button', { name: 'form.submit_button' }),
		);
		expect(SignUpAction).not.toHaveBeenCalled();
	});
});
