import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface ActionPillProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}

export const ActionPill = ({
	children,
	className,
	onClick,
	disabled = false,
}: ActionPillProps) => {
	return (
		<button
			aria-label="action-pill"
			className={cn('bg-(--color-gray-100) rounded-2xl py-1.5 px-4', className)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
