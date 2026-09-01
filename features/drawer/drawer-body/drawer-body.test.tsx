import { render, screen } from '@testing-library/react';
import { DrawerBody } from './drawer-body';
import { useDrawer } from '@/app/context/drawer-context';
import { drawerProps } from '@/app/context/utils/drawer-testing-utils';

vi.mock('@/app/context/drawer-context');
vi.mock('@/features/cart-drawer/cart-drawer-body', () => ({
	CartDrawerBody: () => <div data-testid="cart-drawer-body" />,
}));
vi.mock('@/features/wishlist-drawer/wishlist-drawer-body', () => ({
	WishlistDrawerBody: () => <div data-testid="wishlist-drawer-body" />,
}));
const onScroll = vi.fn();

const renderComp = () => {
	render(<DrawerBody onScroll={onScroll} />);
};

describe('DrawerBody', () => {
	it('should display cart drawer body if shouldDisplayCartDrawer is true', () => {
		vi.mocked(useDrawer).mockReturnValue(drawerProps);
		renderComp();

		expect(screen.getByTestId('cart-drawer-body')).toBeInTheDocument();
		expect(
			screen.queryByTestId('wishlist-drawer-body'),
		).not.toBeInTheDocument();
	});

	it('should display wishlist drawer body if shouldDisplayCartDrawer is false', () => {
		vi.mocked(useDrawer).mockReturnValue({
			...drawerProps,
			drawer: 'wishlist',
		});
		renderComp();

		expect(screen.getByTestId('wishlist-drawer-body')).toBeInTheDocument();
		expect(screen.queryByTestId('cart-drawer-body')).not.toBeInTheDocument();
	});
});
