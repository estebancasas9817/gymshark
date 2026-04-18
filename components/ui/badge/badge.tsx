import { ReactNode } from 'react';
import { Text } from '../text';
import { cn } from '@/utils/cn/cn';

interface BadgeProps {
	children: ReactNode;
	className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => {
	return (
		<Text
			as="span"
			className={cn(
				'bg-gray-100 text-primary rounded-sm px-2 py-1 font-bold',
				className,
			)}
		>
			{children}
		</Text>
	);
};
