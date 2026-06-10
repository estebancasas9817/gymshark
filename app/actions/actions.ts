'use server';

import { auth } from '@/libs/auth/auth';
import { addToCart } from '@/libs/firebase/db/cart/add-to-cart';
import { deleteCart } from '@/libs/firebase/db/cart/delete-cart';
import { addToWishlist } from '@/libs/firebase/db/wishlist/add-to-wishlist';
import { deleteWishlist } from '@/libs/firebase/db/wishlist/delete-wishlist';
import { CartItem } from '@/types/cart';
import { WishlistItem } from '@/types/wishlist';
import { revalidateTag } from 'next/cache';

export const addToCartAction = async (
	cart: CartItem | CartItem[],
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToCart({ cart, userEmail });
		revalidateTag(`cart-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const deleteCartAction = async (
	cart: CartItem,
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}
		const res = await deleteCart({ cart, userEmail });
		revalidateTag(`cart-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const addToWishlistAction = async (
	wishlist: WishlistItem | WishlistItem[],
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToWishlist({ wishlist, userEmail });
		revalidateTag(`wishlist-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const deleteWishlistAction = async (
	wishlist: WishlistItem,
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}
		const res = await deleteWishlist({ wishlist, userEmail });
		revalidateTag(`wishlist-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};
