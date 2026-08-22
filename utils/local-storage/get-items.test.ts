import { getItemsFromLocalStorage } from './get-items';

const getItemFn = vi.fn();
vi.stubGlobal('localStorage', {
	getItem: getItemFn,
});

const expectedItem = 'item';
vi.stubGlobal('JSON', {
	parse: vi.fn().mockReturnValue(expectedItem),
});

describe('getItemsFromLocalStorage', () => {
	it('should call getItem if typeof window is defined', () => {
		const key = 'key';
		getItemsFromLocalStorage(key);
		expect(getItemFn).toHaveBeenCalledWith(key);
	});

	it('should return the item if typeof window is defined', () => {
		const key = 'key';
		getItemFn.mockReturnValue(expectedItem);
		expect(getItemsFromLocalStorage(key)).toBe(expectedItem);
	});

	it('should return null if typeof window is defined but item does not exists', () => {
		const key = 'key';
		getItemFn.mockReturnValue(null);
		expect(getItemsFromLocalStorage(key)).toBe(null);
	});

	it('should return null if typeof window is not defined', () => {
		const key = 'key';
		vi.stubGlobal('window', undefined as unknown as Window);
		expect(getItemsFromLocalStorage(key)).toBe(null);
	});
});
