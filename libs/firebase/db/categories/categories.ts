import { db } from '@/libs/firebase/firebase';
import { Category } from '@/types/category';

export const getCategoryBySlug = async (
	slug: string,
): Promise<Category | null> => {
	const snapshot = await db
		.collection('categories')
		.where('slug', '==', slug)
		.limit(1)
		.get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];

	return {
		id: doc.id,
		...(doc.data() as Omit<Category, 'id'>),
	};
};
