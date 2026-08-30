import { useFilter } from './use-filter';
import { renderHook } from '@testing-library/react';

const mockPush = vi.fn();
const mockGet = vi.fn();
const OPTIONS = { scroll: false };

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
	useSearchParams: () => ({
		toString: vi.fn().mockReturnValue(''),
		get: mockGet,
	}),
}));
describe('useFilter', () => {
	it('should push into the URL the correct url params when handleSize is called ', () => {
		const { result } = renderHook(() => useFilter());
		mockGet.mockReturnValue('xl');
		result.current.handleSize('xs');
		expect(mockPush).toHaveBeenCalledWith('?size=xs&page=1', OPTIONS);
	});
	it('should push into the URL the correct url params when handleColor is called ', () => {
		const { result } = renderHook(() => useFilter());
		mockGet.mockReturnValue('blue');
		result.current.handleColor('red');
		expect(mockPush).toHaveBeenCalledWith('?color=red&page=1', OPTIONS);
	});

	it('should push into the URL the correct url params when handlePrice is called ', () => {
		const { result } = renderHook(() => useFilter());
		mockGet.mockReturnValue('50');
		result.current.handlePrice('40');
		expect(mockPush).toHaveBeenCalledWith('?price=40&page=1', OPTIONS);
	});

	it('should push into the URL the correct url params when handlePagination is called ', () => {
		const { result } = renderHook(() => useFilter());
		result.current.handlePagination(2);
		expect(mockPush).toHaveBeenCalledWith('?page=2');
	});

	it('should push into the URL the correct url params when handleClearAllFilters is called ', () => {
		const { result } = renderHook(() => useFilter());
		result.current.handleClearAllFilters();
		expect(mockPush).toHaveBeenCalledWith('?page=50', OPTIONS);
	});
});
