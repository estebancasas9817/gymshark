import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../init-firestore';
import { mergewishlistItems } from './merge-wishlist';
import { WishlistItem } from '@/types/wishlist';

type DeleteWishlistTypes = {
	userId: string;
	wishlist: WishlistItem;
};
export const deleteWishlist = async ({
	wishlist,
	userId,
}: DeleteWishlistTypes): Promise<{ status: 200 }> => {
	const wishlistRef = db.collection('wishlists').doc(userId);
	const wishlistItems = [{ ...wishlist, shouldDecreaseQuantity: true }];
	const snap = await wishlistRef.get();
	const wishlistDataFirebase = snap.data();
	const firebaseItems: WishlistItem[] = wishlistDataFirebase?.items ?? [];
	if (firebaseItems.length === 1) {
		await wishlistRef.delete();
		return { status: 200 };
	}
	const mergedItems = mergewishlistItems(firebaseItems, wishlistItems, true);

	await wishlistRef.set({
		items: mergedItems,
		updatedAt: FieldValue.serverTimestamp(),
	});
	return { status: 200 };
};
