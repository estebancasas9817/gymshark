import { Stack } from '@/components/layout/stack';
import { XpCounter } from './xp-counter';
import { XpProgressBar } from './xp-counter/xp-progress-bar';

export const XpProgressTracker = () => {
	return (
		<Stack className="flex-1 gap-2 lg:gap-4" justify="start" align="center">
			<XpCounter />
			<XpProgressBar />
		</Stack>
	);
};
