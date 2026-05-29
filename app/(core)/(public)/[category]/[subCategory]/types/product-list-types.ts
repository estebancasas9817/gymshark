export type RouteParams = {
	subCategory: string;
	category: 'women' | 'men' | 'accessories';
};
export type SortBy = 'low_to_high' | 'high_to_low' | 'relevancy';
export type Color = 'Black' | 'White' | 'Red' | 'Blue';
export type Size = 'One Size' | 'XS' | 'S' | 'M' | 'L' | 'XL';

export type QueryParams = {
	color?: Color;
	size?: Size;
	page?: string;
	sortBy?: SortBy;
	price?: SortBy;
};
