import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';

export const XpProgressBar = () => {
	return (
		<div className="w-60 me-8 absolute top-60 left-148">
			<progress
				value={0}
				max={1250}
				className="w-full h-1 appearance-none [&::-webkit-progress-bar]:bg-gray-300 [&::-webkit-progress-value]:bg-black [&::-moz-progress-bar]:bg-black"
			/>
			<Stack direction="row" justify="between">
				<Text as="span">0/1250px</Text>
				<Text as="span">1250xp to go</Text>
			</Stack>
		</div>
	);
};
