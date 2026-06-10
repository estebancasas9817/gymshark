'use client';

import { useWishlist } from '@/app/context/wishlist-context';
import { Conditional } from '@/components/layout/conditional';
import { WishlistEmpty } from '@/features/wishlist-empty';
import { WishlistItem } from '@/features/wishlist-item';

export const WishlistDrawerBody = () => {
	const { optimisticState } = useWishlist();

	return (
		<Conditional test={optimisticState.length > 0} fallback={<WishlistEmpty />}>
			{optimisticState.map(
				({ color, image, name, price, skuId, sizes, productId }) => {
					return (
						<WishlistItem
							key={skuId}
							color={color}
							imageUrl={image}
							name={name}
							price={price}
							currency="$"
							sizes={sizes}
							skuId={skuId}
							productId={productId}
						/>
					);
				},
			)}
		</Conditional>
	);
};
