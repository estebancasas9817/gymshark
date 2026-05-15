import { capitalize } from '@/utils/capitalize/capitalize';
import { db } from '../../firebase';

export async function getProductCountByColor(
	color: string | undefined,
): Promise<number> {
	const normalizedColor = color ? capitalize(color) : 'Black';
	const snapshot = await db
		.collectionGroup('skus')
		.where('color', '==', normalizedColor)
		.where('isActive', '==', true)
		.count()
		.get();
	return snapshot.data().count;
}
