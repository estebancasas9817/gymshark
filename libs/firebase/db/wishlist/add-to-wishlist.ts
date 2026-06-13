import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../init-firestore';
import { mergewishlistItems } from './merge-wishlist';
import { WishlistItem } from '@/types/wishlist';

type AddtoWishlistTypes = {
	userId: string;
	wishlist: WishlistItem | WishlistItem[];
};
export const addToWishlist = async ({
	wishlist,
	userId,
}: AddtoWishlistTypes): Promise<{ status: 200 }> => {
	const wishlistRef = db.collection('wishlists').doc(userId);
	const wishlistItems = !Array.isArray(wishlist) ? [wishlist] : wishlist;
	const snap = await wishlistRef.get();
	const wishlistDataFirebase = snap.data();
	const firebaseItems: WishlistItem[] = wishlistDataFirebase?.items ?? [];
	const mergedItems = mergewishlistItems(firebaseItems, wishlistItems);

	await wishlistRef.set({
		items: mergedItems,
		updatedAt: FieldValue.serverTimestamp(),
	});
	return { status: 200 };
};
