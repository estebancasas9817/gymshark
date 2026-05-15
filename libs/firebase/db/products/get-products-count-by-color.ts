import { AMOUNT_COLORS } from '@/app/(public)/[category]/[subCategory]/constants/constants';
import { db } from '../../firebase';

export async function getProductCountByColor(
	color: string | undefined,
): Promise<number> {
	const updatedColor = color ?? 'Black';
	const snapshot = await db
		.collectionGroup('skus')
		.where('color', '==', updatedColor)
		.count()
		.get();

	return snapshot.data().count * AMOUNT_COLORS;
}
