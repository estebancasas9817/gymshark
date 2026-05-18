import { db } from '../../firebase';
import { normalizeColor, SIZE_MAP } from './utils';
import { getCategoryBySlug } from '../categories/categories';
import {
	Color,
	Size,
} from '@/app/(public)/[category]/[subCategory]/types/product-list-types';

type GetProductCountProps = {
	slug: string;
	color?: Color;
	size?: Size;
	price?: string;
};

export async function getProductCount({
	slug,
	color,
	size,
	price,
}: GetProductCountProps): Promise<number> {
	const { id, behavior } = await getCategoryBySlug(slug);
	const [categorySlug, subcategorySlug] = id.includes('-')
		? id.split('-')
		: [id, null];

	let query = db.collection('products').where('isActive', '==', true);

	if (behavior === 'expand') {
		query = query.where('categorySlug', '==', categorySlug);
	} else {
		query = query.where('subcategorySlug', '==', subcategorySlug);
	}

	// ✅ orderBy obligatorio cuando hay range filter
	if (price) {
		query = query.orderBy('basePrice', 'asc');
		const [min, max] = price.split('_');
		query = query.where('basePrice', '>=', +min).where('basePrice', '<=', +max);
	}

	if (color && size) {
		const normalizedSize = SIZE_MAP[size.toLowerCase()] ?? size;
		query = query.where(
			'variants',
			'array-contains',
			`${color.toUpperCase()}-${normalizedSize.toUpperCase()}`,
		);
	} else if (size) {
		const normalizedSize = SIZE_MAP[size.toLowerCase()] ?? size;
		query = query.where('availableSizes', 'array-contains', normalizedSize);
	} else if (color) {
		query = query.where(
			'availableColors',
			'array-contains',
			normalizeColor(color),
		);
	}

	const snapshot = await query.count().get();
	return snapshot.data().count;
}
