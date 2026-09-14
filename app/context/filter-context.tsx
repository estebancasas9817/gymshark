'use client';

import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';

type Drawer = 'sort' | 'filter';
type Context = {
	isFilterDrawerOpen: boolean;
	handleOpenDrawer: (drawer: Drawer) => void;
	handleCloseDrawer: () => void;
	drawerType: Drawer | null;
};

const FilterContext = createContext<Context | null>(null);

interface FilterProvider {
	children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProvider) => {
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
	const [drawerType, setDrawerType] = useState<Drawer | null>(null);

	const handleOpenDrawer = (drawer: Drawer) => {
		setIsFilterDrawerOpen(true);
		setDrawerType(drawer);
	};
	const handleCloseDrawer = () => {
		setIsFilterDrawerOpen(false);
		setDrawerType(null);
	};

	const value = useMemo(
		() => ({
			isFilterDrawerOpen,
			handleOpenDrawer,
			handleCloseDrawer,
			drawerType,
		}),
		[isFilterDrawerOpen, handleCloseDrawer, handleOpenDrawer, drawerType],
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
