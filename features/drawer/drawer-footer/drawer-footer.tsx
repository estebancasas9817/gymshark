'use client';

import { CartDrawerFooter } from '@/features/cart-drawer/cart-drawer-footer/cart-drawer-footer';

interface DrawerFooterProps {
	isScrolling: boolean;
}

export const DrawerFooter = ({ isScrolling }: DrawerFooterProps) => {
	return <CartDrawerFooter isScrolling={isScrolling} />;
};
