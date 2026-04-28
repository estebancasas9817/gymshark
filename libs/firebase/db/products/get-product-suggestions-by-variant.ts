import { Product } from '@/types/product';
import { db } from '@/libs/firebase/firebase';

export const getSuggestionsByVariant = async (
	variantId: string,
): Promise<Product[]> => {
	const suggestionSnap = await db
		.collection('variantSuggestions')
		.doc(variantId)
		.get();

	if (!suggestionSnap.exists) return [];

	const { productIds } = suggestionSnap.data() as {
		productIds: string[];
	};

	const products: Product[] = [];

	for (const id of productIds) {
		const productSnap = await db.collection('products').doc(id).get();

		if (!productSnap.exists) continue;

		const data = productSnap.data();

		if (!data) continue;

		products.push({
			id: productSnap.id,
			...(data as Omit<Product, 'id'>),
		});
	}

	return products;
};
