'use client';

import { Stack } from '@/components/layout/stack';
import { TierCard } from './benefit-card';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Conditional } from '@/components/layout/conditional';
import { useBreakpoint } from '@/hooks/use-breakpoint';

export const TierBenefits = () => {
	const [shouldDisplayFullTier, setShoulDisplayFullTier] =
		useState<boolean>(false);
	const isDesktop = useBreakpoint('lg');
	const isTabletOrMobile = isDesktop === false;

	const handleClick = () => {
		setShoulDisplayFullTier(!shouldDisplayFullTier);
	};

	return (
		<div className="mt-6 mb-4 lg:mt-20 flex flex-col w-full lg:w-auto">
			<Text
				as="p"
				className="text-center mb-2 text-[10px] font-sans text-tier-1 tracking-[2.7px]"
			>
				TIER 1 BENEFITS
			</Text>
			<div className="-mx-6 md:-mx-16 lg:mx-0">
				<Stack
					gap="sm"
					direction="row"
					className="gap-1 scroll-smooth overflow-x-auto scrollbar-none lg:overflow-x-visible lg:scroll-auto lg:scrollbar-default lg:flex-col px-6 md:px-16 lg:px-0"
				>
					{Array(4)
						.fill(0)
						.map((_, index) => {
							if (index === 3 && !shouldDisplayFullTier && !isTabletOrMobile)
								return null;
							return <TierCard key={index} />;
						})}
				</Stack>
			</div>
			<Conditional test={!isTabletOrMobile}>
				<button
					className="text-center block self-center mt-4 cursor-pointer"
					onClick={handleClick}
				>
					<Conditional
						test={shouldDisplayFullTier}
						fallback={
							<ChevronDown
								color="#424145"
								size={18}
								aria-label="Show fewer Tier 1 benefits"
							/>
						}
					>
						<ChevronUp
							color="#424145"
							size={18}
							aria-label="Show all Tier 1 benefits"
						/>
					</Conditional>
				</button>
			</Conditional>
		</div>
	);
};
