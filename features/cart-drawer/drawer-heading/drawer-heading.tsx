'use client';

import { useCart } from '@/app/context/cart-context';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { WishlistToggle } from '@/components/ui/wishlist-toggle';
import { X } from 'lucide-react';

export const DrawerHeading = () => {
	const { handleCloseDrawer } = useCart();

	return (
		<Stack direction="row" align="center" justify="between">
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
