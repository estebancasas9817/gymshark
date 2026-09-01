import { render, screen } from '@testing-library/react';
import { Drawer } from './drawer';
import { useDrawer } from '@/app/context/drawer-context';
import { drawerProps } from '@/app/context/utils/drawer-testing-utils';

vi.mock('@/app/context/drawer-context');
vi.mock('./drawer-body/drawer-body', () => ({
	DrawerBody: () => <div data-testid="drawer-body" />,
}));
vi.mock('./drawer-footer', () => ({
	DrawerFooter: () => <div data-testid="drawer-footer" />,
}));
vi.mock('./drawer-heading', () => ({
	DrawerHeading: () => <div data-testid="drawer-heading" />,
}));

const renderComp = () => {
	render(<Drawer />);
};

describe('Drawer', () => {
	it('should display drawer if isMounted && isDrawerOpen are true ', () => {
		vi.mocked(useDrawer).mockReturnValue(drawerProps);
		renderComp();
		expect(screen.getByTestId('drawer-body')).toBeInTheDocument();
		expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
		expect(screen.getByTestId('drawer-heading')).toBeInTheDocument();
		screen.debug();
	});

	it('should not display drawer if isMounted is true  but isDrawerOpen is false', () => {
		vi.mocked(useDrawer).mockReturnValue({
			...drawerProps,
			isDrawerOpen: false,
		});
		renderComp();

		expect(screen.queryByTestId('drawer-body')).not.toBeInTheDocument();
		expect(screen.queryByTestId('drawer-footer')).not.toBeInTheDocument();
		expect(screen.queryByTestId('drawer-heading')).not.toBeInTheDocument();
		screen.debug();
	});
});
