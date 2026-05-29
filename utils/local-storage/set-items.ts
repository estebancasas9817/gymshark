export const setItemsInLocalStorage = <T>(
	key: string,
	value: T,
): { status: number } => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(value));
		return { status: 200 };
	}
	return { status: 500 };
};
