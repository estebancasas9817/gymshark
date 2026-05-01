import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'inline';
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	children: ReactNode;
	className?: string;
	radius?: 'none' | 'sm' | 'md' | 'lg';
	type?: 'button' | 'submit';
	onClick?: () => void;
}

export const Button = ({
	variant = 'primary',
	size = 'md',
	disabled = false,
	radius = 'none',
	type = 'button',
	children,
	className,
	onClick,
}: ButtonProps) => {
	const variantStyles = {
		primary: 'bg-primary text-secondary',
		secondary: 'bg-secondary text-primary',
		tertiary: 'bg-gray-100 text-primary',
		ghost: 'bg-transparent text-primary',
		inline: 'text-secondary underline',
	};
	const hoverStyles = {
		primary: 'hover:opacity-90',
		secondary: 'hover:bg-primary hover:text-secondary',
		tertiary: 'hover:bg-primary hover:text-secondary',
		ghost: 'hover:text-gray-500',
		inline: 'hover:text-gray-500',
	};
	const sizeStyles = {
		sm: 'text-sm py-1.5 px-2.5 font-normal',
		md: 'text-base py-3 px-5 font-bold',
		lg: 'text-lg py-3.5 px-16',
	};
	const radiusStyles = {
		none: 'rounded-none',
		sm: 'rounded-2xl',
		md: 'rounded-3xl',
		lg: 'rounded-4xl',
	};

	return (
		<button
			type={type}
			className={cn(
				'inline-flex items-center justify-center transition-colors duration-200',
				variantStyles[variant],
				sizeStyles[size],
				radiusStyles[radius],
				disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
				!disabled && hoverStyles[variant],
				className,
			)}
			disabled={disabled}
			aria-disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
