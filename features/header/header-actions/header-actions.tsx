'use client';

import { useCart } from '@/app/context/cart-context';
import { Stack } from '@/components/layout/stack';
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import Link from 'next/link';

export const HeaderActions = () => {
	const { optimisticState } = useCart();
	const totalAmountOfProducts = optimisticState?.reduce(
		(acc, cart) => acc + cart.quantity,
		0,
	);

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
