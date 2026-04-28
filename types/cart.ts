export type CartItem = {
	productId: string;
	variantId: string;
	quantity: number;
};

export type CartDoc = {
	items: CartItem[];
	updatedAt: FirebaseFirestore.FieldValue;
};
