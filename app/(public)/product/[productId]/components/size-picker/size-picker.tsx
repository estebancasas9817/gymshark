'use client';

import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Check, Ruler } from 'lucide-react';
import { useProductDisplayContext } from '../../context/product-display-context';
import { cn } from '@/utils/cn/cn';
import { useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';

export const SizePicker = () => {
	const { selectedVariant } = useProductDisplayContext();
	const [pickedSize, setPickedsize] = useState<string | null>(null);
	const handleSizePick = (size: string) => {
		setPickedsize(size);
	};
	const handleAddToBag = async () => {
		console.log(pickedSize);
		// IF no user, then add in to the bag via local storage, if user, then call addToCart()
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
					{selectedVariant.sizes.map(({ size, inStock }) => (
						<Button
							variant="ghost"
							className={cn(
								'text-xs flex-1 hover:bg-primary hover:text-secondary font-body font-normal',
								!inStock && 'underline',
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
				className={cn('mt-8 font-sans text-sm font-bold')}
				onClick={handleAddToBag}
			>
				ADD TO BAG
			</Button>
		</Stack>
	);
};
