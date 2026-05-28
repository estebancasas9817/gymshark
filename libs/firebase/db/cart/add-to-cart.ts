import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../init-firestore';
import { CartItem } from '@/types/cart';

type AddtoCartTypes = {
	userId: string;
	productId: string;
	skuId: string;
	size: string;
	quantity: number;
};
export const addToCart = async ({
	userId,
	productId,
	skuId,
	size,
	quantity = 1,
}: AddtoCartTypes): Promise<{ status: number }> => {
	const cartRef = db.collection('carts').doc(userId);

	const snap = await cartRef.get();

	if (!snap.exists) {
		await cartRef.set({
			items: [{ productId, skuId, quantity, size }],
			updatedAt: FieldValue.serverTimestamp(),
		});
		return { status: 200 };
	}

	const data = snap.data();
	const items: CartItem[] = data?.items ?? [];

	const existingIndex = items.findIndex(
		(item: CartItem) =>
			item.productId === productId &&
			item.skuId === skuId &&
			item.size === size,
	);

	if (existingIndex > -1) {
		items[existingIndex].quantity += quantity;
	} else {
		items.push({ productId, skuId, quantity, size });
	}

	await cartRef.update({
		items,
		updatedAt: FieldValue.serverTimestamp(),
	});
	return { status: 200 };
};
