import { Stack } from '@/components/layout/stack';
import { XpCounter } from './xp-counter';

export const XpProgressTracker = () => {
	return (
		<Stack className="relative mt-20">
			<XpCounter />
		</Stack>
	);
};
