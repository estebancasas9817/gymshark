'use client';

import { UIEvent, useEffect, useState } from 'react';
import { DrawerHeading } from './drawer-heading';
import { DrawerFooter } from './drawer-footer';
import { DrawerBody } from './drawer-body/drawer-body';
import { useDrawer } from '@/app/context/drawer-context';

export const Drawer = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const { isDrawerOpen } = useDrawer();
	const [isScrolling, setIsScrolling] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isDrawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isDrawerOpen]);

	if (!isMounted || !isDrawerOpen) return null;

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
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
			<div className="absolute right-0 top-0 bg-secondary w-125 h-screen flex flex-col overflow-hidden">
				<DrawerHeading isScrolling={isScrolling} />
				<DrawerBody onScroll={handleScroll} />
				<DrawerFooter isScrolling={isScrolling} />
			</div>
		</div>
	);
};
