'use client';

import { Stack } from '@/components/layout/stack';
import { Variant } from '@/types/product';
import Image from 'next/image';
import { useProductDisplayContext } from '../../context/product-display-context';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Conditional } from '@/components/layout/conditional';
import { cn } from '@/utils/cn/cn';

interface VariantSelectorGridProps {
	variants: Variant[];
}
export const VariantSelectorGrid = ({ variants }: VariantSelectorGridProps) => {
	const { setSelectedVariant, selectedVariant } = useProductDisplayContext();
	const [variantColor, setVariantColor] = useState<string>(
		selectedVariant.color,
	);
	const handleClick = (variant: Variant) => {
		setSelectedVariant(variant);
	};

	const handleMouseEnter = (color: string) => {
		setVariantColor(color);
	};

	const handleMouseLeave = () => {
		setVariantColor(selectedVariant.color);
	};

	return (
		<>
			<Stack direction="row">
				{variants?.map((variant) => {
					const isSelectedVariant = variant.id === selectedVariant.id;
					const shouldAddBorderOnHover =
						variantColor === variant.color && !isSelectedVariant;
					return (
						<figure
							key={variant.id}
							className={cn(
								'w-12 h-18 mb-2',
								isSelectedVariant && 'outline-2',
								shouldAddBorderOnHover && 'outline',
							)}
						>
							<Image
								src={variant.images[0].trim()}
								alt={`Image ${variant.id}`}
								width={48}
								height={60}
								onClick={() => handleClick(variant)}
								onMouseEnter={() => handleMouseEnter(variant.color)}
								onMouseLeave={handleMouseLeave}
								className={cn('cursor-pointer', isSelectedVariant && 'h-full')}
							/>
						</figure>
					);
				})}
			</Stack>
			<Conditional test={!!variantColor}>
				<Text as="span" variant="tertiary" size="sm" className="text-xs">
					{variantColor}
				</Text>
			</Conditional>
		</>
	);
};
