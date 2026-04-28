export type Variant = {
	id: string;
	color: string;
	sizes: { size: string; inStock: boolean; stock: number }[];
	images: string[];
};
export interface Product {
	id: string;
	name: string;
	shortDescription: string;
	longDescription: string;
	price: number;
	currency: 'COP' | 'USD';
	discount?: number;
	categoryId: string;
	parentCategoryId: string;
	variants: Variant[];
}
