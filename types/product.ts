export type Variant = {
	id: string;
	color: string;
	sizes: { size: string; inStock: boolean; stock: number }[];
	images: string[];
};
// export interface Product {
// 	id: string;
// 	name: string;
// 	shortDescription: string;
// 	longDescription: string;
// 	price: number;
// 	currency: 'COP' | 'USD';
// 	discount?: number;
// 	categoryId: string;
// 	parentCategoryId: string;
// 	variants: Variant[];
// }
export type Product = {
	id: string;
	slug: string;
	name: string;
	shortDescription: string;
	longDescription: string;
	categorySlug: string;
	subcategorySlug: string;
	basePrice: number;
	currency: 'COP' | 'USD';
	coverImage: string;
	isActive: boolean;
	// createdAt: any;
};

export type Sku = {
	id: string;
	productId: string;
	color: string;
	size: string;
	price: number;
	stock: number;
	images: string[];
	isActive: boolean;
};
