import { WishlistItem } from '@/types/wishlist';

export const mergeWishlist = <
	T extends {
		skuId: string;
	},
>(
	currentWishlist: T[],
	newItem: T,
	shouldDeleteWishlistItem?: boolean,
): T[] => {
	const exists = currentWishlist.find((item) => item.skuId === newItem.skuId);
	if (!exists) {
		return [...currentWishlist, newItem];
	}
	if (exists && shouldDeleteWishlistItem) {
		return currentWishlist.filter((item) => item.skuId !== newItem.skuId);
	}
	return [...currentWishlist];
};

export const mergewishlistItems = (
	currentWishlist: WishlistItem[],
	newItems: WishlistItem[],
	shouldDeleteWishlistItem?: boolean,
) => {
	return newItems.reduce(
		(acc, item) => mergeWishlist(acc, item, shouldDeleteWishlistItem),
		currentWishlist,
	);
};
