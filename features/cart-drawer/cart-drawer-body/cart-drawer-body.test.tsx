import { render, screen } from '@testing-library/react';
import { CartDrawerBody } from './cart-drawer-body';
import { useCart } from '@/app/context/cart-context';
import { useDrawer } from '@/app/context/drawer-context';
import { cartProps } from '@/app/context/utils/cart-testing-utils';
import { drawerProps } from '@/app/context/utils/drawer-testing-utils';

vi.mock('@/app/context/cart-context');
vi.mock('@/app/context/drawer-context');
vi.mock('@/components/ui/shipping-progress-bar', () => ({
	ShippingProgressBar: () => <div data-testId="shipping-progress-bar" />,
}));
vi.mock('@/components/ui/cart-notice', () => ({
	CartNotice: () => <div data-testId="cart-notice" />,
}));
vi.mock('@/features/cart-item', () => ({
	CartItem: () => <div data-testId="cart-item" />,
}));
vi.mock('@/features/empty-cart', () => ({
	EmptyCart: () => <div data-testId="empty-cart" />,
}));

const renderComp = () => {
	render(<CartDrawerBody />);
};

describe('CartDrawerBody', () => {
	beforeEach(() => {
		vi.mocked(useCart).mockReturnValue({
			...cartProps,
			optimisticState: [
				{
					skuId: 'id',
					color: 'red',
					image: '',
					name: '',
					price: 50,
					productId: '',
					quantity: 50,
					size: 'xs',
				},
			],
		});
		vi.mocked(useDrawer).mockReturnValue(drawerProps);
	});
	it('should display shippingProgressBar, CartNotice, and cartItem if optimisticState length is > 0', () => {
		renderComp();
		expect(screen.getByTestId('shipping-progress-bar')).toBeInTheDocument();
		expect(screen.getByTestId('cart-notice')).toBeInTheDocument();
		expect(screen.getByTestId('cart-item')).toBeInTheDocument();
	});

	it('should not display shippingProgressBar, CartNotice, and cartItem if optimisticState length is === 0', () => {
		vi.mocked(useCart).mockReturnValue(cartProps);
		renderComp();
		expect(
			screen.queryByTestId('shipping-progress-bar'),
		).not.toBeInTheDocument();
		expect(screen.queryByTestId('cart-notice')).not.toBeInTheDocument();
		expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
	});

	it('should display EmptyCart if optimisticState length is === 0', () => {
		vi.mocked(useCart).mockReturnValue(cartProps);
		renderComp();
		expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
	});
});
