import { Sku } from '@/types/product';
import { db } from '../../firebase';
import { normalizeColor, SIZE_MAP } from './utils';

export async function getSkusForProducts(
	productIds: string[],
	color: string | undefined,
	size?: string,
): Promise<Record<string, Sku>> {
	if (productIds.length === 0) return {};

	let query = db
		.collectionGroup('skus')
		.where('productId', 'in', productIds)
		.where('isInStock', '==', true);

	if (color) {
		query = query.where('color', '==', normalizeColor(color));
	} else {
		query = query.where('isDefault', '==', true);
	}

	if (size) {
		const normalizedSize = SIZE_MAP[size.toLowerCase()] ?? size;
		query = query.where('sizeKeys', 'array-contains', normalizedSize);
	}

	const snapshot = await query.get();

	const skusByProductId = snapshot.docs.reduce(
		(acc, doc) => {
			const sku = { id: doc.id, ...doc.data() } as Sku;
			acc[sku.productId] = sku;
			return acc;
		},
		{} as Record<string, Sku>,
	);

	// Fallback: productos sin SKU → isDefault desactualizado
	const missingProductIds = productIds.filter((id) => !skusByProductId[id]);

	if (missingProductIds.length > 0) {
		console.warn(
			'[getSkusForProducts] Fallback activado para:',
			missingProductIds,
		);

		const fallbackSnapshot = await db
			.collectionGroup('skus')
			.where('productId', 'in', missingProductIds)
			.where('isInStock', '==', true)
			.get();

		fallbackSnapshot.docs.forEach((doc) => {
			const sku = { id: doc.id, ...doc.data() } as Sku;
			if (!skusByProductId[sku.productId]) {
				skusByProductId[sku.productId] = sku;
			}
		});
	}

	return skusByProductId;
}
