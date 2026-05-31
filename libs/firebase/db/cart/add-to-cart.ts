import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../init-firestore';
import { CartItem } from '@/types/cart';
import { mergeCartItems } from './merge-cart';

type AddtoCartTypes = {
	userId: string;
	cart: CartItem | CartItem[];
};
export const addToCart = async ({
	cart,
	userId,
}: AddtoCartTypes): Promise<{ status: 200 }> => {
	const cartRef = db.collection('carts').doc(userId);
	const cartItems = !Array.isArray(cart) ? [cart] : cart;
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
