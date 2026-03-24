import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
	fullWidth?: boolean;
	as?: 'div' | 'section' | 'main' | 'article';
}

export const Container = ({
	children,
	fullWidth = false,
	as = 'div',
}: ContainerProps) => {
	const Tag = as;
	return (
		<Tag
			className={cn(
				'w-full',
				!fullWidth && 'max-w-(--container-max) mx-auto px-4 lg:px-10',
			)}
		>
			{children}
		</Tag>
	);
};
