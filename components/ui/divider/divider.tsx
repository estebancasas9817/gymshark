import { cn } from '@/utils/cn/cn';

interface DividerProps {
	className?: string;
}

export const Divider = ({ className }: DividerProps) => {
	return <div className={cn('h-px w-full bg-border-secondary', className)} />;
};
