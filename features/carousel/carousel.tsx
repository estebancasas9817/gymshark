'use client';

import { useCarousel } from '@/app/(public)/product/[productId]/components/product-collection/use-carousel';
import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { ActionPill } from '@/components/ui/action-pill';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/utils/cn/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface CarouselProps {
	children: ReactNode;
	sectionName: string;
	className?: string;
	childrenToShow?: 'xs' | 'sm' | 'md';
}
export const Carousel = ({
	children,
	sectionName,
	className,
	childrenToShow = 'sm',
}: CarouselProps) => {
	const { handleClickChevron, handleScroll, scroll, ref } =
		useCarousel(childrenToShow);

	return (
		<Container as="section" className={cn('ps-10 mx-0 w-1/2 mt-4', className)}>
			<Stack direction="row" justify="between" className="mt-10">
				<Heading className="mb-6" size="lg">
					{sectionName}
				</Heading>
				<Stack direction="row">
					<ActionPill
						className={cn(
							'rounded-full p-0 w-8 h-8 flex items-center justify-center cursor-pointer bg-primary',
							scroll.isScrollLeftMax &&
								'cursor-not-allowed bg-(--color-gray-200)',
						)}
						disabled={scroll.isScrollLeftMax}
						onClick={() => handleClickChevron('left')}
					>
						<ChevronLeft
							color={!scroll.isScrollLeftMax ? 'white' : 'black'}
							size={16}
						/>
					</ActionPill>
					<ActionPill
						className={cn(
							'rounded-full p-0 w-8 h-8 flex items-center justify-center cursor-pointer bg-primary',
							scroll.isScrollRightMax &&
								'cursor-not-allowed bg-(--color-gray-200)',
						)}
						onClick={() => handleClickChevron('right')}
						disabled={scroll.isScrollRightMax}
					>
						<ChevronRight
							size={16}
							color={!scroll.isScrollRightMax ? 'white' : 'black'}
						/>
					</ActionPill>
				</Stack>
			</Stack>
			<div
				onScroll={handleScroll}
				ref={ref}
				className="scroll-smooth overflow-x-auto scrollbar-none"
			>
				{children}
			</div>
		</Container>
	);
};
