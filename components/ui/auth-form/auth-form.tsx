import { ReactNode } from 'react';

interface LoginFormProps {
	children: ReactNode;
	action?: () => void;
}
export const AuthForm = ({ children, action }: LoginFormProps) => {
	return (
		<form className="flex flex-col gap-4" action={action}>
			{children}
		</form>
	);
};
