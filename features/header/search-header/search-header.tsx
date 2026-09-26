'use client';

import { useDrawer } from '@/app/context/drawer-context';
import { Stack } from '@/components/layout/stack';
import { Heart, X } from 'lucide-react';

interface SearchHeaderProps {
	handleToogleHeader: (type: 'open' | 'close') => void;
}

export const SearchHeader = ({ handleToogleHeader }: SearchHeaderProps) => {
	const { handleOpenDrawer } = useDrawer();
	return (
		<>
			<Stack direction="row" justify="between" align="center">
				<X
					onClick={() => handleToogleHeader('close')}
					aria-label="close drawer"
					size={24}
				/>
				<Heart
					aria-label="wishlist"
					size={24}
					onClick={() => {
						handleOpenDrawer('wishlist');
						handleToogleHeader('close');
					}}
				/>
			</Stack>
		</>
	);
};
