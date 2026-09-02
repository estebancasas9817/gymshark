import { render, screen } from '@testing-library/react';
import { VariantSelectorGrid } from './variant-selector-grid';
import userEvent from '@testing-library/user-event';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
	useSearchParams: () => ({
		toString: vi.fn(),
	}),
}));

const mockSku = {
	id: 'sku-123',
	productId: 'product-123',
	color: 'Black',
	sizes: [
		{ size: 'S', stock: 10 },
		{ size: 'M', stock: 15 },
		{ size: 'L', stock: 8 },
		{ size: 'XL', stock: 0 },
	],
	price: 49900,
	stock: 33,
	images: ['/images/product-black-1.jpg', '/images/product-black-2.jpg'],
	isInStock: true,
	totalStock: 33,
	sizeKeys: ['S', 'M', 'L', 'XL'],
	isDefault: true,
	isActive: true,
};
const variants = [
	mockSku,
	{
		id: 'sku-456',
		productId: 'product-123',
		color: 'White',
		sizes: [
			{ size: 'S', stock: 5 },
			{ size: 'M', stock: 12 },
			{ size: 'L', stock: 7 },
			{ size: 'XL', stock: 3 },
		],
		price: 49900,
		stock: 27,
		images: ['/images/product-white-1.jpg', '/images/product-white-2.jpg'],
		isInStock: true,
		totalStock: 27,
		sizeKeys: ['S', 'M', 'L', 'XL'],
		isDefault: false,
		isActive: true,
	},
];

const defaultprops = {
	selectedVariant: mockSku,
	variants,
};

const renderComp = (props = defaultprops) => {
	render(<VariantSelectorGrid {...props} />);
};

describe('VariantSelectorGrid', () => {
	it('should call router.push when user clicks Image', async () => {
		const user = userEvent.setup();
		renderComp();
		await user.click(screen.getAllByRole('img')[0]);
		expect(mockPush).toHaveBeenCalledWith('?color=black');
		await user.click(screen.getAllByRole('img')[1]);
		expect(mockPush).toHaveBeenCalledWith('?color=black');
	});
});
