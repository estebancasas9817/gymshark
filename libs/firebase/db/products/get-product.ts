import { db } from '@/libs/firebase/init-firestore';
import { Product } from '@/types/product';

export const getProduct = async (
	productSlug: string,
): Promise<Product | null> => {
	const snapshot = await db
		.collection('products')
		.where('slug', '==', productSlug)
		.limit(1)
		.get();

	if (snapshot.empty) return null;
	const doc = snapshot.docs[0];
	return {
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	};
};
