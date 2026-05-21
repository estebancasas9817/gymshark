import { unstable_cache } from 'next/cache';
import { db } from '../../firebase';
import { NavigationItem } from '@/types/navigationCategory';

export const getNavigation = unstable_cache(
	async (): Promise<NavigationItem[]> => {
		const snapshot = await db.collection('navigation').orderBy('order').get();

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<NavigationItem, 'id'>),
		}));
	},
	['navigation'],
	{
		revalidate: 60 * 60, // 1 hora
		tags: ['navigation'],
	},
);
