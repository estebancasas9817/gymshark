'use server';

import { auth } from '@/libs/auth/auth';
import { addToCart } from '@/libs/firebase/db/cart/add-to-cart';
import { CartItem } from '@/types/cart';
import { revalidateTag } from 'next/cache';

export const addToCartAction = async ({
	productId,
	skuId,
	quantity,
	size,
}: CartItem): Promise<{ status: number; error?: string }> => {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToCart({ productId, quantity, size, skuId, userId });
		revalidateTag(`cart-${userId}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};
