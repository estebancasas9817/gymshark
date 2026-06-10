'use client';

import { useWishlist } from '@/app/context/wishlist-context';
import { Conditional } from '@/components/layout/conditional';

export const WishlistDrawerBody = () => {
	const { optimisticState } = useWishlist();
	return (
		<Conditional test={optimisticState.length > 0}>WishlistBody</Conditional>
	);
};
