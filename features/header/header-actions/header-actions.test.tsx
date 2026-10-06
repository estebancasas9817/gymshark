import { render, screen } from '@testing-library/react';
import { HeaderActions } from './header-actions';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/context/cart-context';
import { cartProps } from '@/app/context/utils/cart-testing-utils';
import {
	drawerProps,
	mockHandleOpenDrawer,
} from '@/app/context/utils/drawer-testing-utils';
import { useDrawer } from '@/app/context/drawer-context';
import userEvent from '@testing-library/user-event';

vi.mock('next-auth/react');
vi.mock('@/app/context/cart-context');
vi.mock('@/app/context/drawer-context');
const renderComp = () => {
	render(<HeaderActions />);
};
describe('HeaderActions', () => {
	beforeEach(() => {
		vi.mocked(useCart).mockReturnValue(cartProps);
		vi.mocked(useDrawer).mockReturnValue(drawerProps);
		vi.mocked(useSession).mockReturnValue({
			data: {
				user: { id: '123' },
				expires: '2026-01-01',
			},
			status: 'authenticated',
			update: vi.fn(),
		});
	});
	it('should call handleOpenDrawer with wishlist as param if user clicks the heart button', async () => {
		const user = userEvent.setup();
		renderComp();
		await user.click(screen.getByRole('button', { name: 'Wishlist drawer' }));
		expect(mockHandleOpenDrawer).toHaveBeenCalledWith('wishlist');
	});
	it('should call handleOpenDrawer with cart as param if user clicks the shopping bag button', async () => {
		const user = userEvent.setup();
		renderComp();
		await user.click(
			screen.getByRole('button', { name: /Cart drawer with \d+ items/ }),
		);
		expect(mockHandleOpenDrawer).toHaveBeenCalledWith('cart');
	});

	it('should contain a link with an href as /account if userid exists', () => {
		renderComp();
		const link = screen.getByRole('link', { name: 'User account' });

		expect(link).toHaveAttribute('href', '/account');
	});

	it('should contain a link with an href as /account if userid exists', () => {
		vi.mocked(useSession).mockReturnValue({
			data: {
				user: { id: undefined },
				expires: '2026-01-01',
			},
			status: 'authenticated',
			update: vi.fn(),
		});
		renderComp();
		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('href', '/sign-in');
	});
});
