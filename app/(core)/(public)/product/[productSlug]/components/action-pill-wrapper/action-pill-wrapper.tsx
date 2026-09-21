'use client';

import { useToast } from '@/app/context/toast-context';
import { useWishlist } from '@/app/context/wishlist-context';
import { Stack } from '@/components/layout/stack';
import { ActionPill } from '@/components/ui/action-pill';
import { Text } from '@/components/ui/text';
import { Sku } from '@/types/product';
import { Heart, Share, Star } from 'lucide-react';

interface ActionPillWrapperProps {
	selectedVariant: Sku;
	name: string;
	discount?: number;
}

export const ActionPillWrapper = ({
	name,
	selectedVariant,
	discount,
}: ActionPillWrapperProps) => {
	const { handleDeleteWishlist, handleAddToWishlist, optimisticState } =
		useWishlist();
	const toast = useToast();
	const { color, id, price, images, sizes, productId } = selectedVariant;
	const isInFavorites = !!optimisticState.find((item) => item.skuId === id);

	const handleFavorites = () => {
		if (isInFavorites) {
			handleDeleteWishlist({
				productId,
				skuId: id,
				color,
				name,
				price,
				image: images[0],
				sizes,
				discount,
			});
			toast.success('Item removed from your wishlist.');
		} else {
			handleAddToWishlist({
				productId,
				skuId: id,
				color,
				name,
				price,
				image: images[0],
				sizes,
				discount,
			});
			toast.success('Item added to your wishlist.');
		}
	};

	const handleShareLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success('Link copied');
		} catch (err) {
			toast.error('Error copying URL');
		}
	};

	return (
		<Stack direction="row" gap="lg" className="pt-4 pb-6 md:py-12">
			<ActionPill className="cursor-pointer hover:bg-gray-200">
				<Stack
					direction="row"
					align="center"
					justify="center"
					className="gap-1"
				>
					<Star size={12} fill="black" />
					<Text as="span" className="text-xs">
						4.1
					</Text>
					<Text className="underline text-xs">(66)</Text>
				</Stack>
			</ActionPill>
			<ActionPill
				className="cursor-pointer hover:bg-gray-200"
				onClick={handleFavorites}
			>
				<Heart
					size={18}
					className={isInFavorites ? 'fill-black text-black' : 'text-[#111111]'}
				/>
			</ActionPill>
			<ActionPill
				className="cursor-pointer hover:bg-gray-200"
				onClick={handleShareLink}
			>
				<Share size={18} />
			</ActionPill>
		</Stack>
	);
};
