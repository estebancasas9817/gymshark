export const setItemsInLocalStorage = (key: string, value: any) => {
	if (global.window !== undefined) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};
