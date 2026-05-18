// utils/normalize/normalize-filters.ts
export const SIZE_MAP: Record<string, string> = {
	'one size': 'One Size',
	xs: 'XS',
	s: 'S',
	m: 'M',
	l: 'L',
	xl: 'XL',
};

export const normalizeSize = (size: string) =>
	SIZE_MAP[size.toLowerCase()] ?? size;
export const normalizeColor = (color: string) =>
	color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

export const splitSlug = (id: string): [string, string | null] => {
	const firstDash = id.indexOf('-');

	if (firstDash === -1) return [id, null];

	const categorySlug = id.slice(0, firstDash);
	const subcategorySlug = id.slice(firstDash + 1);

	return [categorySlug, subcategorySlug];
};
