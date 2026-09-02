import { render, screen } from '@testing-library/react';
import { CartDrawerFooter } from './cart-drawer-footer';
import { useCart } from '@/app/context/cart-context';
import { cartProps } from '@/app/context/utils/cart-testing-utils';
import { addCheckoutSession } from '@/app/actions/actions';
import { useDrawer } from '@/app/context/drawer-context';
import { drawerProps } from '@/app/context/utils/drawer-testing-utils';
import userEvent from '@testing-library/user-event';

vi.mock('@/app/context/cart-context');
vi.mock('@/app/context/drawer-context');
vi.mock('@/app/actions/actions', () => ({
	addCheckoutSession: vi.fn(),
}));
const mockSuccess = vi.fn();
const mockError = vi.fn();
vi.mock('@/app/context/toast-context', () => ({
	useToast: () => ({
		success: mockSuccess,
		error: mockError,
	}),
}));
vi.mock('@/components/ui/payment-methods', () => ({
	PaymentMethods: () => <div data-testid="payment-methods" />,
}));
const renderComp = () => {
	render(<CartDrawerFooter isScrolling />);
};

describe('CartDrawerFooter', () => {
	beforeEach(() => {
		vi.mocked(useDrawer).mockReturnValue(drawerProps);
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
	});
	it('should display the cart drawer footer if shouldDisplayCartDrawerFooter is true', () => {
		renderComp();

		expect(screen.getByText('CHECKOUT SECURELY')).toBeInTheDocument();
		expect(screen.getAllByTestId('payment-methods')).toHaveLength(7);
	});

	it('should not display the cart drawer footer if shouldDisplayCartDrawerFooter is false', () => {
		vi.mocked(useDrawer).mockReturnValue({
			...drawerProps,
			drawer: 'wishlist',
		});
		renderComp();
		expect(screen.queryByText('CHECKOUT SECURELY')).not.toBeInTheDocument();
		expect(screen.queryAllByTestId('payment-methods')).toHaveLength(0);
	});

	it('should call addCheckoutSession if user clicks checkout button', async () => {
		const user = userEvent.setup();
		vi.mocked(addCheckoutSession).mockResolvedValue({
			status: 200,
			url: '/url',
		});
		renderComp();
		await user.click(screen.getByRole('button', { name: 'CHECKOUT SECURELY' }));

		expect(addCheckoutSession).toHaveBeenCalledWith([
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
		]);
	});
	it('should call toast.success if status is success', async () => {
		const user = userEvent.setup();
		vi.mocked(addCheckoutSession).mockResolvedValue({
			status: 200,
			url: '/url',
		});
		renderComp();
		await user.click(screen.getByRole('button', { name: 'CHECKOUT SECURELY' }));

		expect(mockSuccess).toHaveBeenCalledWith('Redirecting...');
	});

	it('should call toast.error if status is nott success', async () => {
		const user = userEvent.setup();
		vi.mocked(addCheckoutSession).mockResolvedValue({
			status: 500,
			message: 'error',
		});
		renderComp();
		await user.click(screen.getByRole('button', { name: 'CHECKOUT SECURELY' }));

		expect(mockError).toHaveBeenCalledWith('Something went wrong.');
	});
});
