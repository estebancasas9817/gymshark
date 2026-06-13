import { db } from '../../init-firestore';

export const updateStock = async (
	lineItems: Array<{
		productId: string;
		skuId: string;
		size: string;
		quantity: number;
	}>,
) => {
	const promises = lineItems.map(async (item) => {
		const skuRef = db
			.collection('products')
			.doc(item.productId)
			.collection('skus')
			.doc(item.skuId);

		const skuSnap = await skuRef.get();
		const skuData = skuSnap.data();

		if (!skuData) return;

		const updatedSizes = skuData.sizes.map(
			(s: { size: string; stock: number }) =>
				s.size === item.size ? { ...s, stock: s.stock - item.quantity } : s,
		);

		const newTotalStock = updatedSizes.reduce(
			(acc: number, s: { stock: number }) => acc + s.stock,
			0,
		);

		return skuRef.update({
			sizes: updatedSizes,
			totalStock: newTotalStock,
			isInStock: newTotalStock > 0,
		});
	});

	await Promise.all(promises);
};
