export const mockHandleDeleteWishlist = vi.fn();
export const mockHandleAddToWishlist = vi.fn();
export const whislistMock = {
	handleDeleteWishlist: mockHandleDeleteWishlist,
	handleAddToWishlist: mockHandleAddToWishlist,
	optimisticState: [],
	isPending: false,
};
