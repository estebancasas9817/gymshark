import { render, screen } from '@testing-library/react';
import { CartItem } from './cart-item';
import { useCart } from '@/app/context/cart-context';
import {
	cartProps,
	mockHandleAddToCart,
	mockHandleDecreaseCartQuantity,
} from '@/app/context/utils/cart-testing-utils';
import userEvent from '@testing-library/user-event';

vi.mock('@/app/context/cart-context');

const mockOnToggleFavorite = vi.fn();
const defaultProps = {
	id: 'id',
	name: 'name',
	color: 'red',
	size: 'xl',
	price: 50,
	quantity: 1,
	isFavorite: false,
	imageSrc: '/image',
	productId: 'productIs',
	discountPrice: undefined,
	onToggleFavorite: mockOnToggleFavorite,
};

const renderComp = (props = defaultProps) => {
	render(<CartItem {...props} />);
};

describe('CartItem', () => {
	it('should call handleDecreaseCartQuantity if user clicks decrease quantity button', async () => {
		const user = userEvent.setup();
		vi.mocked(useCart).mockReturnValue(cartProps);
		renderComp();

		await user.click(screen.getByRole('button', { name: 'Decrease quantity' }));

		expect(mockHandleDecreaseCartQuantity).toHaveBeenCalledWith({
			color: 'red',
			image: '/image',
			name: 'name',
			price: 50,
			productId: 'productIs',
			quantity: 1,
			size: 'xl',
			skuId: 'id',
		});
	});

	it('should call handleAddToCart if user clicks Increase quantity button', async () => {
		const user = userEvent.setup();
		vi.mocked(useCart).mockReturnValue(cartProps);
		renderComp();

		await user.click(screen.getByRole('button', { name: 'Increase quantity' }));

		expect(mockHandleAddToCart).toHaveBeenCalledWith({
			color: 'red',
			image: '/image',
			name: 'name',
			price: 50,
			productId: 'productIs',
			quantity: 1,
			size: 'xl',
			skuId: 'id',
		});
	});

	it('should call onToggleFavorite if user clicks Add to wishlist button', async () => {
		const user = userEvent.setup();
		vi.mocked(useCart).mockReturnValue(cartProps);
		renderComp();

		await user.click(screen.getByRole('button', { name: 'Add to wishlist' }));

		expect(mockOnToggleFavorite).toHaveBeenCalledWith(defaultProps.id);
	});
});
