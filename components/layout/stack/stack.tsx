import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface FlexContainerProps {
	children: ReactNode;
	direction?: 'row' | 'column';
	align?: 'start' | 'center' | 'end' | 'stretch';
	justify?: 'start' | 'center' | 'between' | 'end';
	gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	wrap?: boolean;
	as?: 'div' | 'section' | 'article' | 'ul' | 'nav';
	className?: string;
}

export const Stack = ({
	children,
	direction = 'column',
	align = 'stretch',
	justify = 'start',
	gap = 'md',
	wrap = false,
	as = 'div',
	className,
}: FlexContainerProps) => {
	const Tag = as;
	const directionStyles = {
		row: 'flex-row',
		column: 'flex-col',
	};
	const alignStyles = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch',
	};
	const justifyStyles = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		between: 'justify-between',
	};

	const gapStyles = {
		xs: 'gap-1',
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6',
		xl: 'gap-8',
	};

	return (
		<Tag
			className={cn(
				'flex',
				directionStyles[direction],
				alignStyles[align],
				justifyStyles[justify],
				gapStyles[gap],
				wrap ? 'flex-wrap' : 'flex-nowrap',
				className,
			)}
		>
			{children}
		</Tag>
	);
};
