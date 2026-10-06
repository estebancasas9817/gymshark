import { render, screen } from '@testing-library/react';
import Page from './page';
import { forgotPasswordFormAction } from '../../sign-in/actions';
import { useTranslations } from 'next-intl';
import userEvent from '@testing-library/user-event';

vi.mock('../../sign-in/actions', () => ({
	forgotPasswordFormAction: vi.fn(),
}));

vi.mock('next-intl');
const tMock = Object.assign(vi.fn((key: string) => key));
vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);

const renderComp = () => {
	render(<Page />);
};
describe('Page', () => {
	it('should call forgotPasswordAction if user clicks on submit ', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(forgotPasswordFormAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
		});
		renderComp();
		await user.type(screen.getByText('input_placeholder'), 'myemail@gmail.com');

		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(forgotPasswordFormAction).toHaveBeenCalled();
	});

	it('should display text of success if action throws sucess', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(forgotPasswordFormAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
		});
		renderComp();
		await user.type(screen.getByText('input_placeholder'), 'myemail@gmail.com');

		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(screen.getByText('CHECK YOUR EMAIL')).toBeInTheDocument();
	});

	it('should display text of error if action throws error', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(forgotPasswordFormAction).mockResolvedValue({
			status: 'UNEXPECTED_ERROR',
			success: false,
		});
		renderComp();
		await user.type(screen.getByText('input_placeholder'), 'myemail@gmail.com');
		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(screen.getByText(/Unexpected Error/)).toBeInTheDocument();
	});

	it('should not call forgotPasswordFormAction if user clicks on submit but without the inputs', async () => {
		const user = userEvent.setup();
		vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);
		vi.mocked(forgotPasswordFormAction).mockResolvedValue({
			status: 'SUCCESS',
			success: true,
		});
		renderComp();
		await user.click(screen.getByRole('button', { name: 'button_text' }));
		expect(forgotPasswordFormAction).not.toHaveBeenCalled();
	});
});
