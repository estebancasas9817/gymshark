export type NavigationCategory = {
	id: string;
	label: string;
	slug: string;
	href: string;
};

export type NavigationItem = {
	id: string;
	label: string;
	order: number;
	href: string;
	categories: NavigationCategory[];
};
