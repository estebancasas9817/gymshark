export interface Product {
	id: string;
	name: string;
	shortDescription: string;
	longDescription: string;
	price: number;
	currency: 'COP' | 'USD';
	discount?: number;
	categoryId: string;
	variants: {
		id: string;
		color: string;
		images: string[];
		sizes: {
			size: string;
			stock: number;
		}[];
	}[];
}
