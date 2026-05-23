import { db } from '@/libs/firebase/firebase';
import csv from 'csv-parser';
import { Readable } from 'stream';

export async function POST(req: Request) {
	const form = await req.formData();
	const file = form.get('file') as File;
	const text = await file.text();
	const rows: any[] = [];

	await new Promise<void>((resolve) => {
		Readable.from(text)
			.pipe(csv())
			.on('data', (data) => rows.push(data))
			.on('end', () => resolve());
	});

	const batch = db.batch();

	for (const r of rows) {
		const productRef = db.collection('products').doc(r.productId);

		// PRODUCT
		batch.set(
			productRef,
			{
				id: r.productId,
				slug: r.slug,
				name: r.name,
				categorySlug: r.category,
				subcategorySlug: r.subcategory,
				basePrice: Number(r.price),
				currency: 'USD',
				isActive: true,
				availableColors: r.availableColors.split('|'),
				availableSizes: r.availableSizes.split('|'),
				variants: r.variants.split('|'),
				sortIndex: Number(r.sortIndex), // ✅ número
				...(r.discount ? { discount: Number(r.discount) } : {}), // ✅ opcional
			},
			{ merge: true },
		);

		// SKU — 1 por color ✅
		const skuId = `${r.productId}-${r.color}`.toUpperCase();
		const skuRef = productRef.collection('skus').doc(skuId);

		// ✅ sizesAndStock: "S:50|M:30|L:40|XL:20" → [{size, stock}]
		const sizesArray = r.sizesAndStock.split('|').map((s: string) => {
			const [size, stock] = s.split(':');
			return { size, stock: Number(stock) };
		});

		const sizeKeys = sizesArray.map((s: { size: string }) => s.size);
		const totalStock = sizesArray.reduce(
			(sum: number, s: { stock: number }) => sum + s.stock,
			0,
		);

		batch.set(skuRef, {
			id: skuId,
			productId: r.productId,
			color: r.color,
			price: Number(r.price),
			images: r.images ? r.images.split('|').filter(Boolean) : [], // ✅ no ['']
			sizeKeys,
			sizes: sizesArray,
			isActive: true,
			isInStock: totalStock > 0,
			isDefault: r.isDefault === 'true', // ✅ Black = true
			totalStock,
		});
	}

	await batch.commit();
	return Response.json({ ok: true, imported: rows.length });
}
