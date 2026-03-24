import { cn } from '@/utils/cn/cn';
import { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type BaseProps = {
	children: ReactNode;
	size?: Size;
	variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
	className?: string;
};
type LabelProps = BaseProps &
	LabelHTMLAttributes<HTMLLabelElement> & {
		as: 'label';
	};
type ParagraphProps = BaseProps &
	HTMLAttributes<HTMLParagraphElement> & {
		as?: 'p';
	};
type SpanProps = BaseProps &
	HTMLAttributes<HTMLSpanElement> & {
		as: 'span';
	};
type TextProps = LabelProps | ParagraphProps | SpanProps;

export const Text = ({
	as = 'p',
	children,
	size,
	variant = 'primary',
	className,
	...rest
}: TextProps) => {
	const defaultSize: Record<NonNullable<TextProps['as']>, Size> = {
		p: 'md',
		span: 'sm',
		label: 'sm',
	};
	const variantStyles = {
		primary: 'text-primary',
		secondary: 'text-secondary',
		tertiary: 'text-gray-400',
		muted: 'text-gray-200',
	};
	const sizeStyles = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
	};
	const finalSize = size ?? defaultSize[as];

	if (as === 'label') {
		return (
			<label
				className={cn(
					'font-body leading-relaxed',
					variantStyles[variant],
					sizeStyles[finalSize],
					className,
				)}
				{...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
			>
				{children}
			</label>
		);
	}

	if (as === 'span') {
		return (
			<span
				className={cn(
					'font-body leading-relaxed',
					variantStyles[variant],
					sizeStyles[finalSize],
					className,
				)}
				{...(rest as React.HTMLAttributes<HTMLSpanElement>)}
			>
				{children}
			</span>
		);
	}

	return (
		<p
			className={cn(
				'font-body leading-relaxed',
				variantStyles[variant],
				sizeStyles[finalSize],
				className,
			)}
			{...(rest as React.HTMLAttributes<HTMLParagraphElement>)}
		>
			{children}
		</p>
	);
};
