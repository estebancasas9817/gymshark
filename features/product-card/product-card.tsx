'use client';

import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { ActionPill } from '@/components/ui/action-pill';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Sku } from '@/types/product';
import { cn } from '@/utils/cn/cn';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './product-card.module.css';

interface ProductCardProps {
	color: string;
	name: string;
	price: string;
	href: string;
	imageSrc: string[];
	desc: string;
	variant: Sku;
	discount: number | undefined;
	shouldUpdateImgOnHover?: boolean;
	imageClassNames?: string;
	productCardClassNames?: string;
}

export const ProductCard = ({
	name,
	color,
	price,
	href,
	imageSrc,
	desc,
	variant,
	discount,
	shouldUpdateImgOnHover = false,
	imageClassNames,
	productCardClassNames,
}: ProductCardProps) => {
	const [isActiveHover, setIsActiveHover] = useState<boolean>(false);
	const imgSrc =
		isActiveHover && shouldUpdateImgOnHover ? imageSrc[1] : imageSrc[0];
	const fullPrice = +price + (discount ? +discount : 0);

	const handleMouseEnter = () => {
		setIsActiveHover(true);
	};

	const handleMouseLeave = () => {
		setIsActiveHover(false);
	};

	return (
		<article
			className={cn(styles['product-card'], 'mb-6', productCardClassNames)}
		>
			<figure className={cn('relative w-full h-90', imageClassNames)}>
				<Link href={href}>
					<Image
						src={imgSrc}
						alt={desc}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						className={cn('h-82 w-full object-cover', imageClassNames)}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
					/>
				</Link>
				<Conditional test={isActiveHover && !shouldUpdateImgOnHover}>
					<div
						className={cn(
							'flex absolute bottom-0 bg-gray-100 w-full gap-2 min-h-18 flex-wrap',
							variant?.sizes.length <= 4 && 'justify-center',
						)}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						{variant?.sizes.map(({ size }) => (
							<Button
								className="min-w-16 self-center h-10"
								variant="secondary"
								size="sm"
								key={size}
							>
								{size}
							</Button>
						))}
					</div>
				</Conditional>
				<Conditional test={shouldUpdateImgOnHover}>
					<Badge className="absolute bottom-2 left-2"> NEW </Badge>
				</Conditional>
				<ActionPill className="absolute top-2 right-2 rounded-full p-2 cursor-pointer">
					<Heart size={16} />
				</ActionPill>
			</figure>
			<Link href={href}>
				<Text as="p" size="sm" className="mb-1 mt-2">
					{name}
				</Text>
				<Stack gap="xs">
					<Text as="span" className="inline-block" variant="tertiary" size="sm">
						{color}
					</Text>
					<Stack direction="row" className="mt-1">
						<Text as="span" className="font-bold">{`$${price}`}</Text>
						<Conditional test={!!discount}>
							<Text
								as="span"
								className="text-text-sale line-through"
							>{`$${fullPrice}`}</Text>
						</Conditional>
					</Stack>
				</Stack>
			</Link>
		</article>
	);
};
