'use client';

import { useCart } from '@/app/context/cart-context';
import { useDrawer } from '@/app/context/drawer-context';
import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const HeaderActions = () => {
	const session = useSession();
	const { optimisticState } = useCart();
	const { handleOpenDrawer } = useDrawer();
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
			<button onClick={() => handleOpenDrawer('wishlist')}>
				<Heart size={20} />
			</button>
			<Link href={href}>
				<UserRound size={20} />
			</Link>
			<button
				onClick={() => handleOpenDrawer('cart')}
				className="cursor-pointer relative"
			>
				<ShoppingBag size={20} />
				<Text
					as="span"
					className="px-1.5 py-0.5 font-bold rounded-full bg-blue-500 text-secondary absolute -top-2 z-10 -right-3 text-xs"
				>
					{totalAmountOfProducts}
				</Text>
			</button>
		</Stack>
	);
};
