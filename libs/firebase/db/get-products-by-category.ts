import { Product } from '@/types/product';
import { db } from '../firebase';

export const getProductsByCategory = async (
	categoryId: string,
): Promise<Product[]> => {
	const snapshot = await db
		.collection('products')
		.where('categoryId', '==', categoryId)
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));
};
