import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
	fullWidth?: boolean;
	as?: 'div' | 'section' | 'main' | 'article' | 'footer';
	className?: string;
	sectionId?: string;
}

export const Container = ({
	children,
	fullWidth = false,
	as = 'div',
	className,
	sectionId,
}: ContainerProps) => {
	const Tag = as;
	return (
		<Tag
			className={cn(
				'w-full',
				!fullWidth && 'max-w-max mx-auto px-4 lg:px-10',
				className,
			)}
			{...(sectionId && { id: sectionId })}
		>
			{children}
		</Tag>
	);
};
