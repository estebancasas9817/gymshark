import { render, screen } from '@testing-library/react';
import { WishlistDrawerBody } from './wishlist-drawer-body';
import { useWishlist } from '@/app/context/wishlist-context';
import { whislistMock } from '@/app/context/utils/wishlist-testing-utils';

vi.mock('@/app/context/wishlist-context');
vi.mock('@/features/wishlist-item', () => ({
	WishlistItem: () => <div data-testid="product-card" />,
}));

const renderComp = () => {
	render(<WishlistDrawerBody />);
};

describe('WishlistDrawerBody', () => {
	it('Should display an empty wishList drawer', () => {
		vi.mocked(useWishlist).mockReturnValue(whislistMock);
		renderComp();
		expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
		expect(
			screen.getByText(
				`Tap the heart next to anything you like the look of and we'll save it here. Then when you're ready, add it to your bag, check out, put it on, and then let's go gym.`,
			),
		).toBeInTheDocument();
		expect(screen.queryByText('product-card')).not.toBeInTheDocument();
	});

	it('Should display a wishList drawer with  the wishlist items', () => {
		vi.mocked(useWishlist).mockReturnValue({
			...whislistMock,
			optimisticState: [
				{
					skuId: 'id',
					color: 'red',
					image: '',
					name: '',
					price: 50,
					productId: '',
				},
			],
		});
		renderComp();
		expect(screen.getByTestId('product-card')).toBeInTheDocument();
		expect(
			screen.queryByText('Your wishlist is empty'),
		).not.toBeInTheDocument();
	});
});
