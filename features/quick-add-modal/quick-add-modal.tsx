'use client';

import { useCart } from '@/app/context/cart-context';
import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface QuickAddModalProps {
	isdrawerOpen: boolean;
	sizes: {
		size: string;
		stock: number;
	}[];
	imgSrc: string;
	name: string;
	color: string;
	price: number;
	setIsDrawerOpen: (isDrawerOpen: boolean) => void;
	alt: string;
	productId: string;
	id: string;
	discount?: number;
}

export const QuickAddModal = ({
	isdrawerOpen,
	sizes,
	color,
	imgSrc,
	name,
	price,
	alt,
	setIsDrawerOpen,
	productId,
	id,
	discount,
}: QuickAddModalProps) => {
	const { handleAddToCart, isPending, startTransition } = useCart();
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isdrawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isdrawerOpen]);

	if (!isMounted || !isdrawerOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm"
			onClick={() => setIsDrawerOpen(false)}
		>
			<div
				className="flex w-full flex-col overflow-hidden rounded-t-2xl bg-secondary py-8 px-4"
				onClick={(e) => e.stopPropagation()}
			>
				<Stack
					direction="row"
					justify="between"
					className="border-b border-b-gray-100 pb-4"
				>
					<div />
					<Heading as="h6" className="text-center text-base">
						Quick Add
					</Heading>
					<X onClick={() => setIsDrawerOpen(false)} />
				</Stack>
				<Stack direction="row" className="mt-2" as="article">
					<figure className="relative w-40 aspect-5/6">
						<Image src={imgSrc} alt={alt} fill className="object-cover" />
					</figure>
					<Stack gap="xs">
						<Heading as="h6" className="text-xs truncate ">
							{name}
						</Heading>
						<Text as="span" className="text-[#767a7f]">
							{color}
						</Text>
						<Text as="span">${price}</Text>
					</Stack>
				</Stack>
				<Heading as="h6" className="text-sm mt-4">
					Select Size
				</Heading>
				<Stack className="mt-2">
					{sizes.map(({ size, stock }) => (
						<Stack
							key={size}
							direction="row"
							justify="between"
							align="start"
							className="border-t border-t-[#dee0e3] flex-1 pt-4"
						>
							<span className="font-medium text-sm">{size}</span>
							<Conditional
								test={stock > 0}
								fallback={
									<span className="text-sm font-medium">Out of stock</span>
								}
							>
								<button
									className="flex flex-row items-center gap-2 text-sm font-medium"
									onClick={() =>
										startTransition(() => {
											handleAddToCart(
												{
													size,
													productId,
													quantity: 1,
													skuId: id,
													color,
													name,
													price,
													image: imgSrc,
													...(discount && { discount }),
													sizes,
												},
												false,
											);
										})
									}
								>
									<Conditional
										test={!isPending}
										fallback={
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary border-t-primary" />
										}
									>
										<span>Add to bag</span>
										<PlusCircle size={14} />
									</Conditional>
								</button>
							</Conditional>
						</Stack>
					))}
				</Stack>
			</div>
		</div>
	);
};
