'use client';

import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Check, Ruler } from 'lucide-react';
import { cn } from '@/utils/cn/cn';
import { useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { Sku } from '@/types/product';
import { useCart } from '@/app/context/cart-context';
import { Conditional } from '@/components/layout/conditional';
import { CartItemFull } from '@/schemas/cart.schema';

interface SizePickerProps {
	selectedVariant: Sku;
	name: string;
	discount?: number;
}

// TODO: Finish this component
export const SizePicker = ({
	selectedVariant,
	name,
	discount,
}: SizePickerProps) => {
	const { handleAddToCart, isPending } = useCart();
	const [pickedSize, setPickedsize] = useState<string>(
		selectedVariant.sizes[0].size,
	);

	const handleAddToBag = (cart: CartItemFull) => {
		handleAddToCart(cart);
	};

	const handleSizePick = (size: string) => {
		setPickedsize(size);
	};

	return (
		<Stack className="gap-0 mt-8">
			<Stack direction="row" align="center" justify="between">
				<Text as="span" variant="tertiary" className="text-xs">
					Select a size
				</Text>
				<Button
					variant="ghost"
					className="underline flex items-center gap-1 font-bold justify-center text-xs p-0"
				>
					<Ruler size={16} />
					<Text as="span" className="me-2 text-xs">
						Size Guide
					</Text>
				</Button>
			</Stack>
			<Stack className="border border-particles-grey mt-1 px-2 py-6 rounded-md gap-0">
				<Stack direction="row" gap="xs">
					{selectedVariant.sizes.map(({ size, stock }) => (
						<Button
							variant="ghost"
							className={cn(
								'text-xs flex-1 hover:bg-primary hover:text-secondary font-body font-normal',
								stock === 0 && 'underline',
								pickedSize === size && 'bg-primary text-secondary',
							)}
							key={size}
							onClick={() => handleSizePick(size)}
						>
							{size}
						</Button>
					))}
				</Stack>
				<Text
					as="span"
					className="flex items-center gap-1 py-5 self-center text-[13px] text-gray-700"
					size="sm"
				>
					<Text
						as="span"
						className="bg-green-700 w-4 h-4 inline-block rounded-full"
					>
						<Check size={16} color="white" />
					</Text>
					Customers say it fits
					<Tooltip content="On average 12 reviewers say this product is true to size.">
						<Text as="span" className="underline cursor-pointer">
							true to size
						</Text>
					</Tooltip>
				</Text>
			</Stack>
			<Button
				size="lg"
				radius="lg"
				disabled={!pickedSize}
				className={cn('mt-8 font-sans text-sm font-bold')}
				onClick={() =>
					handleAddToBag({
						color: selectedVariant.color,
						image: selectedVariant.images[0],
						name,
						price: selectedVariant.price,
						productId: selectedVariant.productId,
						quantity: 1,
						size: pickedSize as string,
						skuId: selectedVariant.id,
						discount,
						sizes: selectedVariant.sizes,
					})
				}
			>
				<Conditional
					test={!isPending}
					fallback={
						<div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary border-t-primary" />
					}
				>
					ADD TO BAG
				</Conditional>
			</Button>
		</Stack>
	);
};
