import { render, screen } from '@testing-library/react';
import { ProductListSideBar } from './product-list-side-bar';
import { useTranslations } from 'next-intl';
import userEvent from '@testing-library/user-event';
import { QUERY_PARAMS } from '../../hooks/constants';

vi.mock('next-intl');
const tMock = Object.assign(
	vi.fn((key: string) => key),
	{
		raw: vi.fn().mockImplementation((namespace: string | undefined) => {
			if (namespace === 'sections.sort_by.options')
				return { relevance: 'Relevance', newest: 'Newest' };
			if (namespace === 'sections.size.options') return { sm: 's' };
			if (namespace === 'sections.color.options') return { red: 'red' };
			if (namespace === 'sections.price.options')
				return { under_25: 'under_25' };
			return {};
		}),
	},
);
vi.mocked(useTranslations).mockReturnValue(tMock as ReturnType<typeof useTranslations>);

const mockKeys = vi.fn();
const mockGet = vi.fn();
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	useSearchParams: () => ({
		get: mockGet,
		keys: mockKeys,
	}),
}));

const mockHandleClearAllFilters = vi.fn();
const mockHandleSortBy = vi.fn();
const mockHandlePrice = vi.fn();
const mockHandleSize = vi.fn();
vi.mock('../../hooks/use-filter', () => ({
	useFilter: () => ({
		handleClearAllFilters: mockHandleClearAllFilters,
		handleSortBy: mockHandleSortBy,
		handlePrice: mockHandlePrice,
		handleSize: mockHandleSize,
	}),
}));

const renderComp = () => {
	render(<ProductListSideBar />);
};

describe('ProductListSideBar', () => {
	beforeEach(() => {
		mockKeys.mockReturnValue([]);
	});
	it('should display header title', () => {
		renderComp();
		expect(
			screen.getByRole('heading', { name: 'header.title' }),
		).toBeInTheDocument();
	});
	it('should display clear all button and should have a disabled attr as false as initial state', () => {
		renderComp();
		const clearAllBtn = screen.getByRole('button', {
			name: 'header.clear_all',
		});
		expect(clearAllBtn).toBeInTheDocument();
		expect(clearAllBtn).toHaveAttribute('disabled', '');
	});

	it('should not call handleClearAllFilters if clear all filters button is disabled', async () => {
		const user = userEvent.setup();
		renderComp();
		const clearAllBtn = screen.getByRole('button', {
			name: 'header.clear_all',
		});
		await user.click(clearAllBtn);
		expect(mockHandleClearAllFilters).not.toHaveBeenCalled();
	});

	it('should call handleClearAllFilters if clear all filters button is enabled', async () => {
		const user = userEvent.setup();
		mockKeys.mockReturnValue(['sort', 'facet']);
		renderComp();
		const clearAllBtn = screen.getByRole('button', {
			name: 'header.clear_all',
		});
		await user.click(clearAllBtn);
		expect(mockHandleClearAllFilters).toHaveBeenCalled();
	});

	it('should call handleSortChange when the sort input is changed', async () => {
		const user = userEvent.setup();
		renderComp();
		const sortInput = screen.getByRole('radio', {
			name: 'Relevance',
		});
		await user.type(sortInput, 'relevance');
		expect(mockHandleSortBy).toHaveBeenCalledWith('relevance');
	});
	it('should call handlePrice when the size button is clicked', async () => {
		const user = userEvent.setup();
		mockGet.mockImplementation((queryParam: string) => {
			if (queryParam === QUERY_PARAMS.price) {
				return '30';
			}
		});
		renderComp();
		const priceButton = screen.getByRole('button', {
			name: 'under_25',
		});
		await user.click(priceButton);
		expect(mockHandlePrice).toHaveBeenCalledWith('25');
	});
	it('should call handleSize when the size button is clicked', async () => {
		const user = userEvent.setup();
		mockGet.mockImplementation((queryParam: string) => {
			if (queryParam === QUERY_PARAMS.size) {
				return 'xs';
			}
		});
		renderComp();
		const sizeButton = screen.getByRole('button', {
			name: 's',
		});
		await user.click(sizeButton);
		expect(mockHandleSize).toHaveBeenCalledWith('s');
	});
});
