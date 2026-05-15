import { Sku } from '@/types/product';
import { db } from '../../firebase';

export async function getSkusForProducts(
	productIds: string[],
	color: string | undefined,
): Promise<Sku[]> {
	const updatedColor = color ?? 'Black';
	const snapshot = await db
		.collectionGroup('skus')
		.where('productId', 'in', productIds)
		.where('color', '==', updatedColor)
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Sku, 'id'>),
	}));
}
