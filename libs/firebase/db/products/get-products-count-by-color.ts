import { capitalize } from '@/utils/capitalize/capitalize';
import { db } from '../../firebase';

export async function getProductCountByColor(
	color: string | undefined,
): Promise<number> {
	const normalizedColor = color ? capitalize(color) : 'Black';
	// todo: update this function to match real productCount, if sku black is out of stock, but red have, we should still have 30 products for accessories, not 29.
	const snapshot = await db
		.collectionGroup('skus')
		.where('color', '==', normalizedColor)
		.where('isActive', '==', true)
		.count()
		.get();
	return snapshot.data().count;
}
