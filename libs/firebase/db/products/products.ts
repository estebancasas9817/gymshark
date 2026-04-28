import { db } from '@/libs/firebase/firebase';
import { Product } from '@/types/product';

export const getProducts = async (limitCount = 20) => {
	const snapshot = await db.collection('products').limit(limitCount).get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));
};
