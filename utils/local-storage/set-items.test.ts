import { setItemsInLocalStorage } from './set-items';

const setItemFn = vi.fn();
vi.stubGlobal('localStorage', {
	setItem: setItemFn,
});

describe('setItemsInLocalStorage', () => {
	it('should setItems in local storage if typeof window is defined', () => {
		const key = 'key';
		const value = { value: 'value' };
		setItemsInLocalStorage(key, value);
		expect(setItemFn).toHaveBeenCalledWith(key, JSON.stringify(value));
	});

	it('should return status 200 if typeof window is defined', () => {
		const key = 'key';
		const value = { value: 'value' };
		expect(setItemsInLocalStorage(key, value)).toStrictEqual({ status: 200 });
	});

	it('should return status 500 if typeof window is not defined', () => {
		const key = 'key';
		const value = { value: 'value' };
		vi.stubGlobal('window', undefined as unknown as Window);
		expect(setItemsInLocalStorage(key, value)).toStrictEqual({ status: 500 });
	});
});
