'use client';

import { addToCartAction } from '@/app/actions/actions';
import { CartItemFull } from '@/libs/firebase/db/cart/get-cart';
import { deleteItemsInLocalStorage } from '@/utils/local-storage/delete-items';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const CartMerge = () => {
	const session = useSession();
	const router = useRouter();
	const userId = session.data?.user?.id;

	useEffect(() => {
		const addToCart = async (items: CartItemFull[]) => {
			const { status } = await addToCartAction(items);
			if (status === 200) {
				deleteItemsInLocalStorage('cart');
			} else if (status === 401) {
				router.push('/sign-in');
			}
		};

		const localStorageCartItems = getItemsFromLocalStorage<
			CartItemFull[] | null
		>('cart');
		if (userId && localStorageCartItems) {
			addToCart(localStorageCartItems);
		}
	}, [userId, router]);

	return null;
};
