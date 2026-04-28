import { db } from '@/libs/firebase/firebase';
import { Product } from '@/types/product';

export const getProduct = async (id: string): Promise<Product | null> => {
	const snapshot = await db
		.collection('products')
		.where('id', '==', id)
		.limit(1)
		.get();

	if (snapshot.empty) return null;
	const doc = snapshot.docs[0];
	return {
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	};
};
