import { render, screen } from '@testing-library/react';
import { CartItem } from './cart-item';
import { useCart } from '@/app/context/cart-context';
import { useWishlist } from '@/app/context/wishlist-context';
import {
	cartProps,
	mockHandleAddToCart,
	mockHandleDecreaseCartQuantity,
} from '@/app/context/utils/cart-testing-utils';
import {
	mockHandleAddToWishlist,
	mockHandleDeleteWishlist,
	whislistMock,
} from '@/app/context/utils/wishlist-testing-utils';
import userEvent from '@testing-library/user-event';

vi.mock('@/app/context/cart-context');
vi.mock('@/app/context/wishlist-context');

const mockSuccess = vi.fn();
vi.mock('@/app/context/toast-context', () => ({
	useToast: () => ({
		success: mockSuccess,
	}),
}));

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
};

const renderComp = (props = defaultProps) => {
	render(<CartItem {...props} />);
};

describe('CartItem', () => {
	beforeEach(() => {
		vi.mocked(useWishlist).mockReturnValue(whislistMock);
		mockHandleAddToCart.mockClear();
		mockHandleDecreaseCartQuantity.mockClear();
		mockHandleAddToWishlist.mockClear();
		mockHandleDeleteWishlist.mockClear();
		mockSuccess.mockClear();
	});

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

	it('should call handleAddToWishlist if user clicks Add to wishlist button', async () => {
		const user = userEvent.setup();
		vi.mocked(useCart).mockReturnValue(cartProps);
		renderComp();

		await user.click(screen.getByRole('button', { name: 'Add to wishlist' }));

		expect(mockHandleAddToWishlist).toHaveBeenCalledWith({
			color: 'red',
			discount: undefined,
			image: '/image',
			name: 'name',
			price: 50,
			productId: 'productIs',
			sizes: undefined,
			skuId: 'id',
		});
		expect(mockSuccess).toHaveBeenCalledWith('Item added to your wishlist.');
	});
});
