'use client';

import { useCart } from '@/app/context/cart-context';
import { Stack } from '@/components/layout/stack';
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const HeaderActions = () => {
	const session = useSession();
	const { optimisticState, handleOpenDrawer } = useCart();
	const totalAmountOfProducts = optimisticState?.reduce(
		(acc, cart) => acc + cart.quantity,
		0,
	);
	const user = session.data?.user?.email;
	const href = user ? '/account' : '/sign-in';

	return (
		<Stack as="nav" direction="row" gap="xl" align="center">
			<Link href={''}>
				<Search size={20} />
			</Link>
			<Link href={''}>
				<Heart size={20} />
			</Link>
			<Link href={href}>
				<UserRound size={20} />
			</Link>
			{/* Here I add my totalAmountOfProducts if there are */}
			<button onClick={handleOpenDrawer} className="cursor-pointer">
				<ShoppingBag size={20} />
			</button>
		</Stack>
	);
};
