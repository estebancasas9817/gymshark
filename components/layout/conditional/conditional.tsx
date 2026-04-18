import { ReactNode } from 'react';

interface ConditionalProps {
	children: ReactNode;
	test: boolean;
	fallback?: ReactNode;
}

export const Conditional = ({
	children,
	test,
	fallback = null,
}: ConditionalProps) => {
	return test ? <>{children}</> : <>{fallback}</>;
};
