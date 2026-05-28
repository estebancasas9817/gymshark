'use client';

import { Stack } from '@/components/layout/stack';
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import Link from 'next/link';

export const HeaderActions = () => {
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
				<ShoppingBag size={20} />
			</Link>
		</Stack>
	);
};
