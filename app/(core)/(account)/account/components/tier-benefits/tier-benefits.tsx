import { Stack } from '@/components/layout/stack';
import { TierCard } from './benefit-card';
import { Text } from '@/components/ui/text';

export const TierBenefits = () => {
	return (
		<div className="mt-40">
			<Text as="p" className="text-center mb-2">
				TIER 1 BENEFITS
			</Text>
			<Stack gap="sm">
				<TierCard />
				<TierCard />
				<TierCard />
				<TierCard />
			</Stack>
		</div>
	);
};
