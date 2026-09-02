import { render, screen } from '@testing-library/react';
import Page from './page';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import userEvent from '@testing-library/user-event';
import { resetPasswordAction } from './actions';

const mockGet = vi.fn();
vi.mock('next/navigation', () => ({
	useSearchParams: vi.fn(),
}));
vi.mock('next-intl');
const tMock = Object.assign(vi.fn((key: string) => key));
vi.mocked(useTranslations).mockReturnValue(tMock as any);
vi.mocked(useSearchParams).mockReturnValue({
	get: mockGet,
});

vi.mock('./actions', () => ({
	resetPasswordAction: vi.fn(),
}));

const renderComp = () => {
	render(<Page />);
};

describe('Page', () => {
	it('should call resetPasswordAction if user clicks on submit ', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as any);
		vi.mocked(resetPasswordAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
			message: '',
		});
		renderComp();
		await user.type(
			screen.getByText('input_placeholder_password'),
			'newpassword',
		);
		await user.type(
			screen.getByText('input_placeholder_confirm_password'),
			'newpassword',
		);
		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(resetPasswordAction).toHaveBeenCalled();
	});

	it('should display text of success if action throws sucess', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as any);
		vi.mocked(resetPasswordAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
			message: 'success',
		});
		renderComp();
		await user.type(
			screen.getByText('input_placeholder_password'),
			'newpassword',
		);
		await user.type(
			screen.getByText('input_placeholder_confirm_password'),
			'newpassword',
		);
		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(screen.getByText('success')).toBeInTheDocument();
	});

	it('should display text of error if action throws error', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as any);
		vi.mocked(resetPasswordAction).mockResolvedValue({
			status: 'UNEXPECTED_ERROR',
			success: false,
			message:
				'An unexpected error occurred on our end. Please try again in a few moments.',
		});
		renderComp();
		await user.type(
			screen.getByText('input_placeholder_password'),
			'newpassword',
		);
		await user.type(
			screen.getByText('input_placeholder_confirm_password'),
			'newpassword',
		);
		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(
			screen.getAllByText(
				/An unexpected error occurred on our end. Please try again in a few moments./,
			),
		).toHaveLength(2);
	});

	it('should cnot all resetPasswordAction if user clicks on submit but without the inputs', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as any);
		vi.mocked(resetPasswordAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
			message: '',
		});
		renderComp();
		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(resetPasswordAction).not.toHaveBeenCalled();
	});
});
