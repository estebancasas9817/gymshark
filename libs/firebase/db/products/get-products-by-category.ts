import { Product } from '@/types/product';
import { CategoryBehavior } from '@/types/category';
import { db } from '../../firebase';

type GetProductByCategoryProps = {
	behavior: CategoryBehavior;
	id: string;
};

export const getProductsByCategory = async ({
	behavior,
	id,
}: GetProductByCategoryProps): Promise<Product[]> => {
	if (behavior === 'expand') {
		const snapshot = await db
			.collection('products')
			.where('parentCategoryId', '==', id)
			.get();

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Product, 'id'>),
		}));
	}
	const snapshot = await db
		.collection('products')
		.where('categoryId', '==', id)
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, 'id'>),
	}));
};
