import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { Check } from 'lucide-react';

export const TierCard = () => {
	return (
		<Stack
			direction="column"
			className="bg-[#cecfd0] p-4.5 w-55 lg:w-74 lg:flex-row shrink-0"
			align="center"
			gap="lg"
		>
			<Check size={14} />
			<Text as="span" className="text-tier-1 text-xs leading-0.5">
				Anniversary reward
			</Text>
		</Stack>
	);
};
