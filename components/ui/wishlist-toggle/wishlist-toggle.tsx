'use client';

import { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/utils/cn/cn';

type ActiveTab = 'bag' | 'wishlist';

export function WishlistToggle() {
	const [active, setActive] = useState<ActiveTab>('bag');

	return (
		<div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
			<button
				onClick={() => setActive('bag')}
				className={cn(
					'flex items-center justify-center w-10 h-9 transition-all duration-200 rounded-[18px] cursor-pointer',
					active === 'bag'
						? 'bg-black text-white shadow-sm'
						: 'text-gray-400 hover:text-gray-600',
				)}
				aria-label="Shopping bag"
			>
				<ShoppingBag size={20} strokeWidth={1.75} />
			</button>

			<button
				onClick={() => setActive('wishlist')}
				className={cn(
					'flex items-center justify-center w-10 h-9 transition-all duration-200 rounded-[18px] cursor-pointer',
					active === 'wishlist'
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
