import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Heart } from 'lucide-react';

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
	isFavorite?: boolean;
	imageSrc: string;
	onUpdateQuantity?: (id: string, newQuantity: number) => void;
	onToggleFavorite?: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
	id,
	name,
	color,
	size,
	price,
	quantity,
	isFavorite,
	imageSrc,
	onUpdateQuantity,
	onToggleFavorite,
}) => {
	const handleDecrease = () => {
		// if (quantity > 1) {
		// 	onUpdateQuantity(id, quantity - 1);
		// }
	};

	const handleIncrease = () => {
		// onUpdateQuantity(id, quantity + 1);
	};

	return (
		<div className="flex w-full gap-4 border-b border-gray-100 bg-white py-5 font-sans">
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
				<div className="flex justify-between gap-2">
					<div className="flex flex-col gap-0.5">
						<h3 className="text-[15px] font-medium leading-tight text-[#111111] hover:underline cursor-pointer">
							{name}
						</h3>
						<p className="text-[14px] text-[#767676]">
							{color} • {size}
						</p>
					</div>

					<button
						onClick={() => onToggleFavorite?.(id)}
						className="group p-1 text-[#111111] transition-colors hover:text-red-500"
						aria-label="Add to wishlist"
					>
						<Heart
							className={`h-5 w-5 transition-transform group-active:scale-95 ${
								isFavorite ? 'fill-black text-black' : 'text-[#111111]'
							}`}
							strokeWidth={1.5}
						/>
					</button>
				</div>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 text-[15px] font-bold text-[#111111]">
						<span>${price.toFixed(2).replace('.00', '')}</span>
						{/* {originalPrice && (
							<span className="text-[14px] font-normal text-red-600 line-through">
								${originalPrice.toFixed(2).replace('.00', '')}
							</span>
						)} */}
					</div>

					<div className="flex items-center border border-transparent bg-white">
						<button
							onClick={handleDecrease}
							disabled={quantity <= 1}
							className="flex h-8 w-8 items-center justify-center text-[#111111] transition-opacity disabled:opacity-30"
							aria-label="Decrease quantity"
						>
							<Minus className="h-4 w-4" strokeWidth={2} />
						</button>

						<span className="w-8 text-center text-[14px] font-medium text-[#111111]">
							{quantity}
						</span>

						<button
							onClick={handleIncrease}
							className="flex h-8 w-8 items-center justify-center text-[#111111]"
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
