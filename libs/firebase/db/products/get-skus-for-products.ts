import { Sku } from '@/types/product';
import { db } from '../../firebase';
import { capitalize } from '@/utils/capitalize/capitalize';

export async function getSkusForProducts(
	productIds: string[],
	color: string | undefined,
): Promise<Sku[]> {
	const normalizedColor = color ? capitalize(color) : 'Black';
	const snapshot = await db
		.collectionGroup('skus')
		.where('productId', 'in', productIds)
		.where('color', '==', normalizedColor)
		.get();

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Sku, 'id'>),
	}));
}
