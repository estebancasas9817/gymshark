export const mockHandleAddToCart = vi.fn();
export const mockHandleDecreaseCartQuantity = vi.fn();
export const startTransitionMock = vi.fn();
export const clearCartMock = vi.fn();

export const cartProps = {
	handleAddToCart: mockHandleAddToCart,
	handleDecreaseCartQuantity: mockHandleDecreaseCartQuantity,
	isPending: false,
	optimisticState: [],
	startTransition: startTransitionMock,
	clearCart: clearCartMock,
};
