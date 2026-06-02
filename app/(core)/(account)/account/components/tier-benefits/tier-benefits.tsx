'use client';

import { Stack } from '@/components/layout/stack';
import { TierCard } from './benefit-card';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Conditional } from '@/components/layout/conditional';

export const TierBenefits = () => {
	const [shouldDisplayFullTier, setShoulDisplayFullTier] =
		useState<boolean>(false);
	const handleClick = () => {
		setShoulDisplayFullTier(!shouldDisplayFullTier);
	};

	return (
		<div className="mt-40 flex flex-col">
			<Text
				as="p"
				className="text-center mb-2 text-[10px] font-sans text-tier-1 tracking-[2.7px]"
			>
				TIER 1 BENEFITS
			</Text>
			<Stack gap="sm" className="gap-1">
				{Array(4)
					.fill(0)
					.map((_, index) => {
						if (index === 3 && !shouldDisplayFullTier) return null;
						return <TierCard key={index} />;
					})}
			</Stack>
			<button
				className="text-center block self-center mt-4 cursor-pointer"
				onClick={handleClick}
			>
				<Conditional
					test={shouldDisplayFullTier}
					fallback={<ChevronDown color="#424145" size={18} />}
				>
					<ChevronUp color="#424145" size={18} />
				</Conditional>
			</button>
		</div>
	);
};
