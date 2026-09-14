'use client';

import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';

type Context = {
	isFilterDrawerOpen: boolean;
	handleOpenDrawer: () => void;
	handleCloseDrawer: () => void;
};

const FilterContext = createContext<Context | null>(null);

interface FilterProvider {
	children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProvider) => {
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

	const handleOpenDrawer = () => {
		setIsFilterDrawerOpen(true);
	};
	const handleCloseDrawer = () => {
		setIsFilterDrawerOpen(false);
	};

	const value = useMemo(
		() => ({
			isFilterDrawerOpen,
			handleOpenDrawer,
			handleCloseDrawer,
		}),
		[isFilterDrawerOpen, handleCloseDrawer, handleOpenDrawer],
	);

	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
};

export const useFilterDrawer = () => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error(
			'You need to wrap the provider in order to use the context',
		);
	}
	return context;
};
