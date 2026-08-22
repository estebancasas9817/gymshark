import { deleteItemsInLocalStorage } from './delete-items';

const removeItemFn = vi.fn();
vi.stubGlobal('localStorage', {
	removeItem: removeItemFn,
	addItem: vi.fn(),
	setItem: vi.fn(),
	clear: vi.fn(),
});

describe('deleteItemsInLocalStorage', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});
	it('should delete items in local storage if typeof window is defined', () => {
		const key = 'key';
		deleteItemsInLocalStorage(key);
		expect(removeItemFn).toHaveBeenCalledWith(key);
	});

	it('should return status 200 if typeof window is defined', () => {
		expect(deleteItemsInLocalStorage('key')).toStrictEqual({ status: 200 });
	});

	it('should return status 500 if typeof window is not defined', () => {
		vi.stubGlobal('window', undefined as unknown as Window);

		expect(deleteItemsInLocalStorage('key')).toStrictEqual({ status: 500 });
	});

	it('should not call removeItem if typeof window is not defined', () => {
		const key = 'key';
		deleteItemsInLocalStorage(key);
		expect(removeItemFn).not.toHaveBeenCalled();
	});
});
