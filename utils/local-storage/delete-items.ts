export const deleteItemsInLocalStorage = (key: string): { status: number } => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(key);
		return { status: 200 };
	}
	return { status: 500 };
};
