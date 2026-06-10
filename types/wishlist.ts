export type WishlistItem = {
	productId: string;
	skuId: string;
	size: string;
};

export type WishlistDoc = {
	items: WishlistItem[];
	updatedAt: FirebaseFirestore.FieldValue;
	id: string;
};
