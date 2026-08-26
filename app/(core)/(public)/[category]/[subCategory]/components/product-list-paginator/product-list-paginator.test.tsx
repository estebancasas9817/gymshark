import { render, screen } from '@testing-library/react';
import { ProductListPaginator } from './product-list-paginator';
import userEvent from '@testing-library/user-event';

vi.mock('next/router');

const mockHandlePagination = vi.fn();
vi.mock('../../hooks/use-filter', () => ({
	useFilter: () => ({
		handlePagination: mockHandlePagination,
	}),
}));

const defaultProps = {
	totalPages: 50,
	currentPage: 1,
	siblingCount: 1,
	className: '',
};

const renderComp = (props = defaultProps) => {
	render(<ProductListPaginator {...props} />);
};

describe('ProductListPaginator', () => {
	it('should display the paginator component ', () => {
		renderComp();
		['1', '2', '50'].forEach((page) => {
			expect(
				screen.getByRole('button', { name: `Page ${page}` }),
			).toBeInTheDocument();
		});
	});
	it('should call handlePagination when the user clicks on a page', async () => {
		const user = userEvent.setup();
		renderComp();
		const pageButton = screen.getByRole('button', { name: 'Page 2' });

		await user.click(pageButton);
		expect(mockHandlePagination).toHaveBeenCalledWith(2);
	});
	it('should call handlePagination with page - 1 when the user clicks on the previous arrow', async () => {
		const user = userEvent.setup();
		renderComp({ ...defaultProps, currentPage: 2 });
		const previousPage = screen.getByRole('button', { name: 'Previous page' });

		await user.click(previousPage);
		expect(mockHandlePagination).toHaveBeenCalledWith(1);
	});
	it('should call handlePagination with page + 1 when the user clicks on the next page arrow', async () => {
		const user = userEvent.setup();
		renderComp({ ...defaultProps, currentPage: 2 });
		const previousPage = screen.getByRole('button', { name: 'Next page' });

		await user.click(previousPage);
		expect(mockHandlePagination).toHaveBeenCalledWith(3);
	});
});
