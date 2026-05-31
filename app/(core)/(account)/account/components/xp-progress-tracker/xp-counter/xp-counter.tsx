import { Text } from '@/components/ui/text';

export const XpCounter = () => {
	return (
		<div className="relative">
			<Text className="text-[100px]">0</Text>
			<Text as="span" className="absolute top-8 left-14">
				xp
			</Text>
		</div>
	);
};
