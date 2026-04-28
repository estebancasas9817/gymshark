export const getItemsInLocalStorage = (key: string): string | null => {
	if (global.window !== undefined && localStorage.getItem(key) !== null) {
		const stringifiedItems = localStorage.getItem(key) as string;
		return stringifiedItems;
	}
	return null;
};
