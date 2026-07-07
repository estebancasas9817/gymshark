import { db } from '@/libs/firebase/init-firestore';
import { Product, Sku } from '@/types/product';

export const getProduct = async (
	productSlug: string,
	color?: string,
): Promise<(Product & { activeSku: Sku; skus: Sku[] }) | null> => {
	const snapshot = await db
		.collection('products')
		.where('id', '==', productSlug)
		.limit(1)
		.get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	const product = { id: doc.id, ...(doc.data() as Omit<Product, 'id'>) };

	const skusSnap = await db
		.collection('products')
		.doc(doc.id)
		.collection('skus')
		.get();

	if (skusSnap.empty) return null;

	const skus = skusSnap.docs.map(
		(skuDoc) => ({ id: skuDoc.id, ...skuDoc.data() }) as Sku,
	);

	const activeSku =
		skus.find((sku) => sku.color.toLowerCase() === color?.toLowerCase()) ??
		skus.find((sku) => sku.isDefault) ??
		skus[0];

	return { ...product, activeSku, skus };
};
