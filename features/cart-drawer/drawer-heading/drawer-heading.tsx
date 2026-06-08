'use client';

import { useCart } from '@/app/context/cart-context';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { WishlistToggle } from '@/components/ui/wishlist-toggle';
import { cn } from '@/utils/cn/cn';
import { X } from 'lucide-react';

interface DrawerHeadingProps {
	isScrolling: boolean;
}

export const DrawerHeading = ({ isScrolling }: DrawerHeadingProps) => {
	const { handleCloseDrawer } = useCart();

	return (
		<Stack
			direction="row"
			align="center"
			justify="between"
			as="header"
			className={cn(
				'fixed bg-secondary w-125 h-25 px-8 z-10',
				isScrolling &&
					'border-b border-gray-100 shadow-[0_0.9rem_0.9rem_0_rgba(0,0,0,0.11)]',
			)}
		>
			<Heading as="h6" className="text-sm">
				YOUR BAG
			</Heading>
			<Stack direction="row" align="center" gap="lg">
				<WishlistToggle />
				<button onClick={handleCloseDrawer} className="cursor-pointer">
					<X size={26} />
				</button>
			</Stack>
		</Stack>
	);
};
