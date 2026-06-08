'use server';

import { auth } from '@/libs/auth/auth';
import { addToCart } from '@/libs/firebase/db/cart/add-to-cart';
import { deleteCart } from '@/libs/firebase/db/cart/delete-cart';
import { CartItem } from '@/types/cart';
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
