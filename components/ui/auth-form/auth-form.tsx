import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface LoginFormProps {
	children: ReactNode;
	action?: string | ((formData: FormData) => void | Promise<void>);
	className?: string;
}
export const AuthForm = ({ children, action, className }: LoginFormProps) => {
	return (
		<form className={cn('flex flex-col gap-4', className)} action={action}>
			{children}
		</form>
	);
};
