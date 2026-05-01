import { Stack } from '@/components/layout/stack';
import { ReactNode } from 'react';

interface CategoryGridProps {
	children: ReactNode;
}

export const CategoryGrid = ({ children }: CategoryGridProps) => {
	return (
		<Stack direction="row" gap="sm">
			{children}
		</Stack>
	);
};
