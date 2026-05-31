import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { Check } from 'lucide-react';

export const TierCard = () => {
	return (
		<Stack direction="row" className="bg-[#cecfd0] p-4.5 w-74" align="center">
			<Check size={14} />
			<Text as="span">Anniversary reward</Text>
		</Stack>
	);
};
