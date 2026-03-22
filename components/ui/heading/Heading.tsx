import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

type Size = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
interface HeadingProps {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	size?: Size;
	children: ReactNode;
	className?: string;
}

export const Heading = ({
	as = 'h3',
	size,
	children,
	className,
}: HeadingProps) => {
	const HeadingLevel = as;
	const defaultSize: Record<NonNullable<HeadingProps['as']>, Size> = {
		h1: '3xl',
		h2: '2xl',
		h3: 'xl',
		h4: 'lg',
		h5: 'base',
		h6: 'sm',
	};
	const sizeStyles = {
		sm: 'text-md',
		base: 'text-xl',
		lg: 'text-2xl',
		xl: 'text-3xl',
		'2xl': 'text-4xl',
		'3xl': 'text-5xl',
	};
	const finalSize = size ?? defaultSize[as];

	return (
		<HeadingLevel className={cn(sizeStyles[finalSize], className)}>
			{children}
		</HeadingLevel>
	);
};
