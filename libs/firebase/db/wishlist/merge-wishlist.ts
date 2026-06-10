import { WishlistItem } from '@/types/wishlist';

export const mergeWishlist = <
	T extends {
		skuId: string;
		size: string;
	},
>(
	currentWishlist: T[],
	newItem: T,
	shouldDeleteWishlistItem?: boolean,
): T[] => {
	const exists = currentWishlist.find(
		(item) => item.skuId === newItem.skuId && item.size === newItem.size,
	);
	if (!exists) {
		return [...currentWishlist, newItem];
	}
	if (exists && shouldDeleteWishlistItem) {
		return currentWishlist.filter(
			(item) => !(item.skuId === newItem.skuId && item.size === newItem.size),
		);
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
