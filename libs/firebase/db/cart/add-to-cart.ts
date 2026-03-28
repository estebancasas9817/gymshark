import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../firebase';
import { CartItem } from '@/types/cart';

export const addToCart = async (
	userId: string,
	productId: string,
	variantId: string,
	quantity: number = 1,
) => {
	const cartRef = db.collection('carts').doc(userId);

	const snap = await cartRef.get();

	if (!snap.exists) {
		await cartRef.set({
			items: [{ productId, variantId, quantity }],
			updatedAt: FieldValue.serverTimestamp(),
		});
		return;
	}

	const data = snap.data();
	const items: CartItem[] = data?.items ?? [];

	const existingIndex = items.findIndex(
		(item: CartItem) =>
			item.productId === productId && item.variantId === variantId,
	);

	if (existingIndex > -1) {
		items[existingIndex].quantity += quantity;
	} else {
		items.push({ productId, variantId, quantity });
	}

	await cartRef.update({
		items,
		updatedAt: FieldValue.serverTimestamp(),
	});
};
