'use client';

import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/utils/cn/cn';
import { useDrawer } from '@/app/context/drawer-context';

export function WishlistToggle() {
	const { setDrawer, drawer } = useDrawer();

	return (
		<div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
			<button
				onClick={() => setDrawer('cart')}
				className={cn(
					'flex items-center justify-center w-10 h-9 transition-all duration-200 rounded-[18px] cursor-pointer',
					drawer === 'cart'
						? 'bg-black text-white shadow-sm'
						: 'text-gray-400 hover:text-gray-600',
				)}
				aria-label="Shopping bag"
			>
				<ShoppingBag size={20} strokeWidth={1.75} />
			</button>

			<button
				onClick={() => setDrawer('wishlist')}
				className={cn(
					'flex items-center justify-center w-10 h-9 transition-all duration-200 rounded-[18px] cursor-pointer',
					drawer === 'wishlist'
						? 'bg-black text-white shadow-sm'
						: 'text-gray-400 hover:text-gray-600',
				)}
				aria-label="Wishlist"
			>
				<Heart size={20} strokeWidth={1.75} />
			</button>
		</div>
	);
}
