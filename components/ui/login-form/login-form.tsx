import { ReactNode } from 'react';

interface LoginFormProps {
	children: ReactNode;
}
export const LoginForm = ({ children }: LoginFormProps) => {
	return <form className="flex flex-col gap-4">{children}</form>;
};
