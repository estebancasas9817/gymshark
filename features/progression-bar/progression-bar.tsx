import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { cn } from '@/utils/cn/cn';

const STATUS_CONFIG = {
	pending: { label: 'Order placed', progress: 25, color: 'bg-blue-500' },
	confirmed: { label: "It's confirmed", progress: 50, color: 'bg-blue-500' },
	shipped: { label: "It's on the way", progress: 75, color: 'bg-blue-500' },
	fulfilled: { label: "It's fulfilled", progress: 100, color: 'bg-blue-500' },
} as const;

export const ProgressionBar = ({
	orderStatus,
	fullWidth,
}: {
	orderStatus: string;
	fullWidth?: boolean;
}) => {
	const status =
		STATUS_CONFIG[orderStatus as keyof typeof STATUS_CONFIG] ??
		STATUS_CONFIG.pending;

	return (
		<Stack gap="xs" className="mt-2">
			<Text as="p" size="sm" className="font-bold uppercase">
				Status
			</Text>
			<div
				className={cn(
					'w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden',
					fullWidth && 'w-full',
				)}
			>
				<div
					className={cn('h-full rounded-full', status.color)}
					style={{ width: `${status.progress}%` }}
				/>
			</div>
			<Text as="p" size="sm" variant="tertiary">
				{status.label}
			</Text>
		</Stack>
	);
};
