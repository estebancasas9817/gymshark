export type Category = {
	id: string;
	name: string;
	slug: string;
	parentId: string | null;
	gender: 'men' | 'women' | 'unisex';
	description?: string;
	suggestions?: string[];
};
