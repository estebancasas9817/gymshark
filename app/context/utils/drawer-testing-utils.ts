import { Drawer } from '../drawer-context';

export const mockHandleCloseDrawer = vi.fn();
export const mockHandleOpenDrawer = vi.fn();
export const mockSetDrawer = vi.fn();

export const drawerProps = {
	drawer: 'cart' as Drawer,
	handleCloseDrawer: mockHandleCloseDrawer,
	isDrawerOpen: true,
	handleOpenDrawer: mockHandleOpenDrawer,
	setDrawer: mockSetDrawer,
};
