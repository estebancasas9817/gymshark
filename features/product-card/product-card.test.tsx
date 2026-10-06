import { fireEvent, render, screen } from '@testing-library/react';
import { ProductCard } from './product-card';
import { Sku } from '@/types/product';
import { useWishlist } from '@/app/context/wishlist-context';
import userEvent from '@testing-library/user-event';
import {
	mockHandleAddToWishlist,
	mockHandleDeleteWishlist,
	whislistMock,
} from '@/app/context/utils/wishlist-testing-utils';

const mockHandleAddToCart = vi.fn();
vi.mock('@/app/context/cart-context', () => ({
	useCart: () => ({
		handleAddToCart: mockHandleAddToCart,
	}),
}));
vi.mock('@/app/context/wishlist-context');
const mockSuccess = vi.fn();
vi.mock('@/app/context/toast-context', () => ({
	useToast: () => ({
		success: mockSuccess,
	}),
}));
const variant: Sku = {
	color: 'red',
	id: 'id',
	images: ['/image'],
	isActive: true,
	isDefault: true,
	isInStock: true,
	price: 40,
	productId: 'productId',
	sizeKeys: ['sizeKeys'],
	sizes: [{ size: 'xs', stock: 50 }],
	stock: 50,
	totalStock: 50,
};
const defaultProps = {
	name: 'name',
	color: 'blue',
	price: 50,
	href: '/href',
	imageSrc: ['/image'],
	desc: 'description',
	variant,
	discount: undefined,
	shouldUpdateImgOnHover: false,
	imageClassNames: undefined,
	productCardClassNames: undefined,
};
const renderComp = (props = defaultProps) => {
	render(<ProductCard {...props} />);
};
describe('product-card', () => {
	beforeEach(() => {
		vi.mocked(useWishlist).mockReturnValue(whislistMock);
	});
	it('Should call handleAddToWishlist if user clicks on action pill and isInFavorites is false', async () => {
		const user = userEvent.setup();
		renderComp();
		const actionPillButton = screen.getByRole('button', {
			name: 'Add to wishlist',
		});
		await user.click(actionPillButton);
		expect(mockHandleAddToWishlist).toHaveBeenCalledWith({
			color: 'blue',
			discount: undefined,
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
			skuId: 'id',
		});
	});

	it('Should call toast.success if item was added to the wishlist', async () => {
		const user = userEvent.setup();
		renderComp();
		const actionPillButton = screen.getByRole('button', {
			name: 'Add to wishlist',
		});
		await user.click(actionPillButton);
		expect(mockSuccess).toHaveBeenCalledWith('Item added to your wishlist.');
	});

	it('Should call handleDeleteWishlist if user clicks on action pill and isInFavorites is true', async () => {
		const user = userEvent.setup();
		vi.mocked(useWishlist).mockReturnValue({
			...whislistMock,
			optimisticState: [
				{
					skuId: variant.id,
					color: 'red',
					image: '',
					name: '',
					price: 50,
					productId: '',
				},
			],
		});
		renderComp();
		const actionPillButton = screen.getByRole('button', {
			name: 'Remove from wishlist',
		});
		await user.click(actionPillButton);
		expect(mockHandleDeleteWishlist).toHaveBeenCalledWith({
			color: 'blue',
			discount: undefined,
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
			skuId: 'id',
		});
	});

	it('Should call toast.success if item was deleted from the wishlist', async () => {
		const user = userEvent.setup();
		vi.mocked(useWishlist).mockReturnValue({
			...whislistMock,
			optimisticState: [
				{
					skuId: variant.id,
					color: 'red',
					image: '',
					name: '',
					price: 50,
					productId: '',
				},
			],
		});
		renderComp();
		const actionPillButton = screen.getByRole('button', {
			name: 'Remove from wishlist',
		});
		await user.click(actionPillButton);
		expect(mockSuccess).toHaveBeenCalledWith(
			'Item removed from your wishlist.',
		);
	});

	it('Should have a link with an href attr', () => {
		renderComp();
		const link = screen.getByRole('link', {
			name: 'description',
		});
		expect(link).toHaveAttribute('href', '/href?color=blue');
	});

	it('Should not display new badge if shouldUpdateImgOnHover is false', () => {
		renderComp();

		expect(screen.queryByText('NEW')).not.toBeInTheDocument();
	});

	it('Should display new badge if shouldUpdateImgOnHover is true', () => {
		renderComp({ ...defaultProps, shouldUpdateImgOnHover: true });

		expect(screen.getByText('NEW')).toBeInTheDocument();
	});
	it('Should call handleAddToCart if user clicks on add to cart button', async () => {
		const user = userEvent.setup();
		renderComp();
		const image = screen.getByRole('img', { name: 'description' });
		fireEvent.mouseEnter(image);
		const addToCartButton = screen.getByText('xs');
		screen.debug();
		await user.click(addToCartButton);
		expect(mockHandleAddToCart).toHaveBeenCalledWith(
			{
				color: 'blue',
				image: '/image',
				name: 'name',
				price: 50,
				productId: 'productId',
				quantity: 1,
				size: 'xs',
				sizes: [
					{
						size: 'xs',
						stock: 50,
					},
				],
				skuId: 'id',
			},
			true,
		);
	});
});
