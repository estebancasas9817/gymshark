'use client';

import { useDrawer } from '@/app/context/drawer-context';
import { Conditional } from '@/components/layout/conditional';
import { CartDrawerBody } from '@/features/cart-drawer/cart-drawer-body';
import { WishlistDrawerBody } from '@/features/wishlist-drawer/wishlist-drawer-body';
import { UIEvent } from 'react';

interface DrawerBodyProps {
	onScroll: (e: UIEvent<HTMLDivElement>) => void;
}

export const DrawerBody = ({ onScroll }: DrawerBodyProps) => {
	const { drawer } = useDrawer();
	const shouldDisplayCartDrawer = drawer === 'cart';

	return (
		<div
			className="flex-1 overflow-y-auto scroll-smooth px-8 pt-25 pb-4"
			onScroll={onScroll}
		>
			<Conditional
				test={shouldDisplayCartDrawer}
				fallback={<WishlistDrawerBody />}
			>
				<CartDrawerBody />
			</Conditional>
		</div>
	);
};
