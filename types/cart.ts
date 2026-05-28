export type CartItem = {
	productId: string;
	skuId: string;
	quantity: number;
	size: string;
};

export type CartDoc = {
	items: CartItem[];
	updatedAt: FirebaseFirestore.FieldValue;
	id: string;
};
