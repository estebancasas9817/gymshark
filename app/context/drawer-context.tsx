'use client';

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

type Drawer = 'cart' | 'wishlist' | null;
type Context = {
	handleOpenDrawer: (drawer: Drawer) => void;
	handleCloseDrawer: () => void;
	isDrawerOpen: boolean;
	drawer: Drawer;
	setDrawer: Dispatch<SetStateAction<Drawer>>;
};

const DrawerContext = createContext<Context | null>(null);

interface DrawerProviderProps {
	children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const [drawer, setDrawer] = useState<Drawer>(null);

	const handleOpenDrawer = useCallback((drawer: Drawer) => {
		setDrawer(drawer);
		setIsDrawerOpen(true);
	}, []);

	const handleCloseDrawer = useCallback(() => {
		setDrawer(null);
		setIsDrawerOpen(false);
	}, []);

	const value = useMemo(
		() => ({
			handleOpenDrawer,
			handleCloseDrawer,
			isDrawerOpen,
			setDrawer,
			drawer,
		}),
		[handleOpenDrawer, handleCloseDrawer, isDrawerOpen, setDrawer, drawer],
	);

	return (
		<DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
	);
};

export const useDrawer = () => {
	const context = useContext(DrawerContext);
	if (!context) {
		throw new Error('you must wrapp the provider in order to use this context');
	}
	return context;
};
