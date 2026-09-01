import { render, screen } from '@testing-library/react';
import { DrawerHeading } from './drawer-heading';
import { useDrawer } from '@/app/context/drawer-context';
import {
	drawerProps,
	mockHandleCloseDrawer,
	mockSetDrawer,
} from '@/app/context/utils/drawer-testing-utils';
import userEvent from '@testing-library/user-event';

vi.mock('@/app/context/drawer-context');

const renderComp = () => {
	render(<DrawerHeading isScrolling />);
};

describe('DrawerHeading', () => {
	it('should display heading as YOUR BAG if drawer is === cart', () => {
		vi.mocked(useDrawer).mockReturnValue(drawerProps);
		renderComp();

		expect(screen.getByText('YOUR BAG')).toBeInTheDocument();
		expect(screen.queryByText('WISHLIST')).not.toBeInTheDocument();
	});

	it('should display heading as WISHLIST if drawer is !== cart', () => {
		vi.mocked(useDrawer).mockReturnValue({
			...drawerProps,
			drawer: 'wishlist',
		});
		renderComp();

		expect(screen.getByText('WISHLIST')).toBeInTheDocument();
		expect(screen.queryByText('YOUR BAG')).not.toBeInTheDocument();
	});

	it('should call handleCloseDrawer if user clicks on the X button', async () => {
		const user = userEvent.setup();

		renderComp();
		await user.click(screen.getByRole('button', { name: 'Close Drawer' }));

		expect(mockHandleCloseDrawer).toHaveBeenCalled();
	});

	it('should call setDrawer if user clicks on the shopping bag button', async () => {
		const user = userEvent.setup();

		renderComp();
		await user.click(screen.getByRole('button', { name: 'Shopping bag' }));

		expect(mockSetDrawer).toHaveBeenCalledWith('cart');
	});

	it('should call setDrawer if user clicks on the wishlist button', async () => {
		const user = userEvent.setup();

		renderComp();
		await user.click(screen.getByRole('button', { name: 'Wishlist' }));

		expect(mockSetDrawer).toHaveBeenCalledWith('wishlist');
	});
});
