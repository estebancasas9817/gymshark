export const getItemsFromLocalStorage = <T>(key: string): T | null => {
	if (typeof window === 'undefined') return null;
	const item = localStorage.getItem(key);
	if (!item) return null;
	return JSON.parse(item) as T;
};
