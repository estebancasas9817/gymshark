import { render, screen } from '@testing-library/react';
import { DrawerFooter } from './drawer-footer';

vi.mock('@/features/cart-drawer/cart-drawer-footer/cart-drawer-footer', () => ({
	CartDrawerFooter: () => <div data-testid="cart-drawer-footer" />,
}));
const renderComp = () => {
	render(<DrawerFooter isScrolling />);
};

describe('DrawerFooter', () => {
	it('should display CartDrawerFooter', () => {
		renderComp();

		expect(screen.getByTestId('cart-drawer-footer')).toBeInTheDocument();
	});
});
