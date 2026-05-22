import { EditorialBanner } from '@/types/editorialBanner';
import { db } from '../../firebase';

export async function getEditorialBanner(
	categorySlug: string,
): Promise<EditorialBanner | null> {
	const snap = await db.collection('editorialBanners').doc(categorySlug).get();

	if (!snap.exists) return null;

	return snap.data() as EditorialBanner;
}
