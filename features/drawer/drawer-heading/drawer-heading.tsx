'use client';

import { useDrawer } from '@/app/context/drawer-context';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { WishlistToggle } from '@/components/ui/wishlist-toggle';
import { cn } from '@/utils/cn/cn';
import { X } from 'lucide-react';

interface DrawerHeadingProps {
	isScrolling: boolean;
	isMobile: boolean;
}

export const DrawerHeading = ({
	isScrolling,
	isMobile,
}: DrawerHeadingProps) => {
	const { handleCloseDrawer, drawer } = useDrawer();
	const drawerHeadingTitle = drawer === 'cart' ? 'YOUR BAG' : 'WISHLIST';

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
				isMobile ? 'w-full' : 'w-125',
			)}
		>
			<Heading as="h6" className="text-sm">
				{drawerHeadingTitle}
			</Heading>
			<Stack direction="row" align="center" gap="lg">
				<WishlistToggle />
				<button
					onClick={handleCloseDrawer}
					className="cursor-pointer"
					aria-label="Close Drawer"
				>
					<X size={26} />
				</button>
			</Stack>
		</Stack>
	);
};
