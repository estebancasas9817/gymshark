'use client';

import { Stack } from '@/components/layout/stack';
import { Sku } from '@/types/product';
import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Conditional } from '@/components/layout/conditional';
import { cn } from '@/utils/cn/cn';
import { useRouter, useSearchParams } from 'next/navigation';
import { QUERY_PARAMS } from '@/app/(core)/(public)/[category]/[subCategory]/hooks/constants';

interface VariantSelectorGridProps {
	variants: Sku[];
	selectedVariant: Sku;
}

export const VariantSelectorGrid = ({
	variants,
	selectedVariant,
}: VariantSelectorGridProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [variantColor, setVariantColor] = useState<string>(
		selectedVariant.color,
	);

	const handleClick = (variant: Sku) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(QUERY_PARAMS.color, variant.color.toLowerCase());
		router.push(`?${params.toString()}`);
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
								'relative w-12 aspect-3/4 mb-2 overflow-hidden rounded-sm',
								isSelectedVariant && 'outline-2',
								shouldAddBorderOnHover && 'outline',
							)}
						>
							<Image
								src={variant.images[0].trim()}
								alt={`Image ${variant.id}`}
								fill
								sizes="48px"
								onClick={() => handleClick(variant)}
								onMouseEnter={() => handleMouseEnter(variant.color)}
								onMouseLeave={handleMouseLeave}
								className="cursor-pointer object-cover"
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
