export interface EditorialStat {
	icon: string;
	label: string;
	description: string;
}

export interface EditorialBanner {
	id: string;
	categorySlug: string;
	title: string;
	description: string;
	image: string;
	badge: string;
	stats: EditorialStat[];
}
