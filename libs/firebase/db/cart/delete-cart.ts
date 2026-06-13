import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../init-firestore';
import { CartItem } from '@/types/cart';
import { mergeCartItems } from './merge-cart';

type DeleteCartTypes = {
	userId: string;
	cart: CartItem;
};
export const deleteCart = async ({
	cart,
	userId,
}: DeleteCartTypes): Promise<{ status: 200 }> => {
	const cartRef = db.collection('carts').doc(userId);
	const cartItems = [{ ...cart, shouldDecreaseQuantity: true }];
	const snap = await cartRef.get();
	const cartDataFirebase = snap.data();
	const firebaseItems: CartItem[] = cartDataFirebase?.items ?? [];
	if (firebaseItems.length === 1) {
		await cartRef.delete();
		return { status: 200 };
	}
	const mergedItems = mergeCartItems(firebaseItems, cartItems);

	await cartRef.set({
		items: mergedItems,
		updatedAt: FieldValue.serverTimestamp(),
	});
	return { status: 200 };
};
