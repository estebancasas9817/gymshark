import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../init-firestore';
import { CartItem } from '@/types/cart';
import { mergeCartItems } from './merge-cart';

type DeleteCartTypes = {
	userEmail: string;
	cart: CartItem;
};
export const deleteCart = async ({
	cart,
	userEmail,
}: DeleteCartTypes): Promise<{ status: 200 }> => {
	const cartRef = db.collection('carts').doc(userEmail);
	const cartItems = [{ ...cart, shouldDecreaseQuantity: true }];
	const snap = await cartRef.get();
	const cartDataFirebase = snap.data();
	const firebaseItems: CartItem[] = cartDataFirebase?.items ?? [];
	const mergedItems = mergeCartItems(firebaseItems, cartItems);

	await cartRef.set({
		items: mergedItems,
		updatedAt: FieldValue.serverTimestamp(),
	});
	return { status: 200 };
};
