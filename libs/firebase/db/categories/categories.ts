import { db } from '@/libs/firebase/firebase';
import { Category } from '@/types/category';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const _getCategoryBySlug = async (slug: string): Promise<Category> => {
	const snapshot = await db
		.collection('categories')
		.where('slug', '==', slug)
		.limit(1)
		.get();

	if (snapshot.empty) notFound();

	const doc = snapshot.docs[0];

	return {
		id: doc.id,
		...(doc.data() as Omit<Category, 'id'>),
	};
};

export const getCategoryBySlug = unstable_cache(
	async (slug: string) => _getCategoryBySlug(slug),
	['category-by-slug'], // clave base
	{
		revalidate: 60 * 60 * 24, // 24h
		tags: ['categories'],
	},
);
