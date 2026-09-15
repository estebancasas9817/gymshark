import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Heart } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Stack } from '@/components/layout/stack';
import { useCart } from '@/app/context/cart-context';
import { Conditional } from '@/components/layout/conditional';
import { useWishlist } from '@/app/context/wishlist-context';
import { useToast } from '@/app/context/toast-context';
import { WishlistItemFull } from '@/schemas/wishlist.schema';

export interface CartItemProduct {
	id: string;
	name: string;
	color: string;
	size: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	isFavorite?: boolean;
}

interface CartItemProps {
	id: string;
	name: string;
	color: string;
	size: string;
	price: number;
	quantity: number;
	imageSrc: string;
	productId: string;
	discountPrice?: number;
	onToggleFavorite?: (id: string) => void;
	sizes?: { size: string; stock: number }[];
}

export const CartItem: React.FC<CartItemProps> = ({
	id,
	name,
	color,
	size,
	price,
	quantity,
	imageSrc,
	productId,
	discountPrice,
	sizes,
}) => {
	const { handleAddToCart, handleDecreaseCartQuantity } = useCart();
	const { handleDeleteWishlist, handleAddToWishlist, optimisticState } =
		useWishlist();
	const toast = useToast();
	const isInFavorites = !!optimisticState.find((item) => item.skuId === id);
	const fullPrice = price + (discountPrice ?? 0);
	const handleDecrease = async () => {
		await handleDecreaseCartQuantity({
			size,
			productId,
			quantity: 1,
			skuId: id,
			color,
			name,
			price,
			image: imageSrc,
			...(discountPrice && { discount: discountPrice }),
		});
	};

	const handleIncrease = async () => {
		await handleAddToCart({
			size,
			productId,
			quantity: 1,
			skuId: id,
			color,
			name,
			price,
			image: imageSrc,
			...(discountPrice && { discount: discountPrice }),
		});
	};

	const handleFavorites = ({
		productId,
		skuId,
		color,
		name,
		price,
		image,
		sizes,
		discount,
	}: WishlistItemFull) => {
		if (isInFavorites) {
			toast.success('Item removed from your wishlist.');
			handleDeleteWishlist({
				productId,
				skuId,
				color,
				name,
				price,
				image,
				sizes,
				discount,
			});
		} else {
			toast.success('Item added to your wishlist.');
			handleAddToWishlist({
				productId,
				skuId,
				color,
				name,
				price,
				image,
				sizes,
				discount,
			});
		}
	};

	return (
		<div className="flex w-full gap-4 border-b border-gray-100 py-5 font-sans">
			<div className="relative h-32.5 w-25 shrink-0 overflow-hidden bg-[#F2F2F2]">
				<Image
					src={imageSrc}
					alt={name}
					fill
					sizes="100px"
					className="object-cover"
					priority
				/>
			</div>

			<div className="flex flex-1 flex-col justify-between">
				<Stack
					direction="row"
					justify="between"
					align="start"
					className="gap-2"
				>
					<div className="flex flex-col gap-0.5">
						<Heading as="h6" className="text-xs font-medium cursor-pointer">
							{name}
						</Heading>
						<Text as="p" className="text-xs text-tertiary">
							{color} • {size}
						</Text>
					</div>

					<button
						onClick={() =>
							handleFavorites({
								productId,
								skuId: id,
								color,
								name,
								price,
								image: imageSrc,
								sizes,
							})
						}
						className="group p-1 text-[#111111] transition-colors hover:text-red-500 cursor-pointer"
						aria-label="Add to wishlist"
					>
						<Heart
							className={`h-5 w-5 transition-transform group-active:scale-95 ${
								isInFavorites ? 'fill-black text-black' : 'text-[#111111]'
							}`}
							strokeWidth={1.5}
						/>
					</button>
				</Stack>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 text-[15px] font-bold text-[#111111]">
						<Text as="span" className="text-xs">
							${price.toFixed(2).replace('.00', '')}
						</Text>
						<Conditional test={!!discountPrice}>
							<Text
								as="span"
								className="text-xs font-normal text-red-600 line-through"
							>
								{fullPrice}
							</Text>
						</Conditional>
					</div>

					<div className="flex items-center border border-transparent bg-white">
						<button
							onClick={handleDecrease}
							className="flex h-8 w-8 items-center justify-center text-[#111111] transition-opacity disabled:opacity-30 cursor-pointer"
							aria-label="Decrease quantity"
						>
							<Minus className="h-4 w-4" strokeWidth={2} />
						</button>

						<span className="w-8 text-center text-[14px] font-medium text-[#111111]">
							{quantity}
						</span>

						<button
							onClick={handleIncrease}
							className="flex h-8 w-8 items-center justify-center text-[#111111] cursor-pointer"
							aria-label="Increase quantity"
						>
							<Plus className="h-4 w-4" strokeWidth={2} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
