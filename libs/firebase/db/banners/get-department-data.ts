import { unstable_cache } from 'next/cache';
import { db } from '../../init-firestore';

export type Banner = {
	title: string;
	description: string;
	button: string;
	href: string;
	image: string;
};

export type DepartmentData = {
	department: string;
	slugs: string[];
	banners: Banner[];
	sectionsName: string[];
};

export const getDepartmentData = (
	department: string,
): Promise<DepartmentData> => {
	return unstable_cache(
		async () => {
			const snap = await db
				.collection('banners')
				.where('department', '==', department)
				.limit(1)
				.get();

			return snap.docs[0].data() as DepartmentData;
		},
		['editorial-banners', department],
		{ tags: [`editorial-banners-${department}`] },
	)();
};
