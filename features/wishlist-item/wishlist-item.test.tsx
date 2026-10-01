import { render, screen } from '@testing-library/react';
import { WishlistItem } from './wishlist-item';
import userEvent from '@testing-library/user-event';

const mockHandleDeleteWishlist = vi.fn();
vi.mock('@/app/context/wishlist-context', () => ({
	useWishlist: () => ({
		handleDeleteWishlist: mockHandleDeleteWishlist,
	}),
}));

const mockHandleAddToCart = vi.fn();
vi.mock('@/app/context/cart-context', () => ({
	useCart: () => ({
		handleAddToCart: mockHandleAddToCart,
	}),
}));

const defaultProps = {
	productId: 'productId',
	skuId: 'skuId',
	name: 'name',
	color: 'blue',
	price: 50,
	currency: '$',
	imageUrl: '/image',
	sizes: [{ size: 'xs', stock: 50 }],
	discount: undefined,
};

const renderComp = (props = defaultProps) => {
	render(<WishlistItem {...props} />);
};
describe('WishlistItem', () => {
	it('should display a selected size if user clicks on select size option', async () => {
		const user = userEvent.setup();
		renderComp();

		await user.selectOptions(screen.getByRole('combobox'), 'xs');
		expect(screen.getByRole('combobox')).toHaveValue('xs');
	});
	it('should add to cart if user has selected a size and if user clicks on add to bag button', async () => {
		const user = userEvent.setup();
		renderComp();
		const addToBagButton = screen.getByRole('button', {
			name: 'Add to bag',
		});
		await user.selectOptions(screen.getByRole('combobox'), 'xs');
		await user.click(addToBagButton);
		expect(mockHandleAddToCart).toHaveBeenCalledWith({
			color: 'blue',
			image: '/image',
			name: 'name',
			price: 50,
			productId: 'productId',
			quantity: 1,
			size: 'xs',
			skuId: 'skuId',
		});
	});

	it('should not add to cart if user has not selected a size and if user clicks on add to bag button', async () => {
		const user = userEvent.setup();
		renderComp();
		const addToBagButton = screen.getByRole('button', {
			name: 'Add to bag',
		});
		await user.click(addToBagButton);
		expect(mockHandleAddToCart).not.toHaveBeenCalled();
	});

	it('should call handleDeleteWishlist if user clicks remove from wishlist button and menulist is true', async () => {
		const user = userEvent.setup();
		renderComp();
		const moreOptionsButton = screen.getByRole('button', {
			name: 'More options',
		});
		await user.click(moreOptionsButton);
		const deleteWishlistButton = screen.getByRole('button', {
			name: /Remove from wishlist/i,
		});
		await user.click(deleteWishlistButton);
		expect(mockHandleDeleteWishlist).toHaveBeenCalledWith({
			color: 'blue',
			image: '/image',
			name: 'name',
			price: 50,
			productId: 'productId',
			sizes: [
				{
					size: 'xs',
					stock: 50,
				},
			],
			skuId: 'skuId',
		});
	});

	it('should not call handleDeleteWishlist menulist is false', () => {
		renderComp();
		const deleteWishlistButton = screen.queryByRole('button', {
			name: /Remove from wishlist/i,
		});
		expect(deleteWishlistButton).not.toBeInTheDocument();
		expect(mockHandleDeleteWishlist).not.toHaveBeenCalled();
	});
});
