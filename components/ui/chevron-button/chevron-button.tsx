import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface CheveronButtonProps {
	children: ReactNode;
	disabled?: boolean;
	handleOnClick?: () => void;
}

export const ChevronButton = ({
	children,
	disabled = false,
	handleOnClick,
}: CheveronButtonProps) => {
	return (
		<button
			className={cn(
				'rounded-full w-10 h-10 flex items-center justify-center',
				disabled
					? 'bg-(--color-gray-400) cursor-not-allowed'
					: 'bg-(--color-secondary) cursor-pointer',
			)}
			disabled={disabled}
			onClick={handleOnClick}
		>
			{children}
		</button>
	);
};
