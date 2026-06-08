'use client';

import { useCart } from '@/app/context/cart-context';
import { UIEvent, useEffect, useState } from 'react';
import { DrawerHeading } from './drawer-heading';
import { DrawerFooter } from './drawer-footer';
import { DrawerBody } from './drawer-body/drawer-body';

export const CartDrawer = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const { isDrawerOpen } = useCart();
	const [isScrolling, setIsScrolling] = useState<boolean>(false);

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

		return () => {
			document.body.style.overflow = '';
		};
	}, [isDrawerOpen]);

	// todo: add !isDrawerOpen
	if (!isMounted) return null;

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		const { scrollTop, scrollHeight, clientHeight } = target;
		const hasReachTop = scrollTop === 0;
		const hasReachedBottom = scrollTop + clientHeight >= scrollHeight - 5;
		if (hasReachTop || hasReachedBottom) {
			setIsScrolling(false);
		} else {
			setIsScrolling(true);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100">
			<div
				className="absolute right-0 top-0 bg-secondary w-125 h-screen scroll-smooth overflow-y-auto"
				onScroll={handleScroll}
			>
				<DrawerHeading isScrolling={isScrolling} />
				<DrawerBody />
				<DrawerFooter isScrolling={isScrolling} />
			</div>
		</div>
	);
};
