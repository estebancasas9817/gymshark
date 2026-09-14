'use client';

import { useFilterDrawer } from '@/app/context/filter-context';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { ProductListSideBar } from '../product-list-side-bar';
import { useBreakpoint } from '@/hooks/use-breakpoint';

interface ProductListFilterDrawerProps {
	children: ReactNode;
}

export const ProductListFilterDrawer = ({
	children,
}: ProductListFilterDrawerProps) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const { isFilterDrawerOpen, handleCloseDrawer } = useFilterDrawer();
	const isDesktop = useBreakpoint('lg');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isFilterDrawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isFilterDrawerOpen]);

	useEffect(() => {
		if (isFilterDrawerOpen && isDesktop) {
			handleCloseDrawer();
		}
	}, [isFilterDrawerOpen, isDesktop, handleCloseDrawer]);

	if (!isMounted || !isFilterDrawerOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm"
			onClick={() => handleCloseDrawer()}
		>
			<div className="flex h-[85dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-secondary pt-16 pb-4">
				<div className="flex-1 min-h-0 overflow-y-auto px-8">
					<Suspense>
						<ProductListSideBar />
					</Suspense>
				</div>

				<div className="flex-none px-8 pt-4 bg-secondary border-t border-gray-100">
					{children}
				</div>
			</div>
		</div>
	);
};
