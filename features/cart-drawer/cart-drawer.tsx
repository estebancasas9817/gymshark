'use client';

import { useCart } from '@/app/context/cart-context';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { WishlistToggle } from '@/components/ui/wishlist-toggle';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const CartDrawer = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const { isDrawerOpen, handleCloseDrawer } = useCart();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		//TODO: update this to isDrawerOpen
		if (!isDrawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		// cleanup por si el componente se desmonta con el drawer abierto
		return () => {
			document.body.style.overflow = '';
		};
	}, [isDrawerOpen]);

	// todo: add !isDrawerOpen
	if (!isMounted) return null;

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100">
			<div className="absolute right-0 top-0 bg-secondary w-125 h-screen p-8">
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
			</div>
		</div>
	);
};
