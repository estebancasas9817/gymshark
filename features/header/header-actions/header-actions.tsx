'use client';

import { Stack } from '@/components/layout/stack';
import { CartItemFull } from '@/libs/firebase/db/cart/get-cart';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const HeaderActions = () => {
	const session = useSession();
	const userId = session.data?.user?.id;
	const [cartData, setCartData] = useState<CartItemFull[] | []>();
	const totalAmountOfProducts = cartData?.reduce((acc, cart) => {
		const total = acc + cart.quantity;
		return total;
	}, 0);

	useEffect(() => {
		const getCart = async () => {
			const res = await fetch('/api/cart');
			const { success = false, data } = await res.json();
			if (success) {
				setCartData(data);
			}
		};
		if (userId) {
			getCart();
		} else {
			const data = getItemsFromLocalStorage<CartItemFull[]>('cart');
			if (data) {
				setCartData(data);
			}
		}
	}, [userId]);

	return (
		<Stack as="nav" direction="row" gap="xl" align="center">
			<Link href={''}>
				<Search size={20} />
			</Link>
			<Link href={''}>
				<Heart size={20} />
			</Link>
			<Link href={''}>
				<UserRound size={20} />
			</Link>
			<Link href={''}>
				{/* Here I add my totalAmountOfProducts if there are */}
				<ShoppingBag size={20} />
			</Link>
		</Stack>
	);
};
