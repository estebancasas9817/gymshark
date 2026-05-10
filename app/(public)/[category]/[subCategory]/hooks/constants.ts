export const QUERY_PARAMS = {
	sortBy: 'sortBy',
	size: 'size',
	color: 'color',
	price: 'price',
	page: 'page',
} as const;

export const SORT_BY_OPTIONS = {
	relevancy: 'relevancy',
	low_to_high: 'low_to_high',
	high_to_low: 'high_to_low',
	newest: 'newest',
} as const;
