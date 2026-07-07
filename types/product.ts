export type Variant = {
	id: string;
	color: string;
	sizes: { size: string; inStock: boolean; stock: number }[];
	images: string[];
};

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
	availableColor: string[];
	avaiableSizes: string[];
	discount?: number;
};

export type Sku = {
	id: string;
	productId: string;
	color: string;
	sizes: { size: string; stock: number }[];
	price: number;
	stock: number;
	images: string[];
	isInStock: boolean;
	totalStock: number;
	sizeKeys: string[];
	isDefault: boolean;
	isActive: boolean;
};
