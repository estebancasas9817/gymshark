// app/api/admin/import/route.ts
import { db } from '@/libs/firebase/firebase';
import csv from 'csv-parser';
import { Readable } from 'stream';

export async function POST(req: Request) {
	const form = await req.formData();
	const file = form.get('file') as File;

	const text = await file.text();

	const rows: any[] = [];

	await new Promise<void>((resolve) => {
		const stream = Readable.from(text);

		stream
			.pipe(csv())
			.on('data', (data) => rows.push(data))
			.on('end', () => resolve());
	});

	const batch = db.batch();

	for (const r of rows) {
		// PRODUCT (merge para no duplicar)
		const productRef = db.collection('products').doc(r.productId);

		batch.set(
			productRef,
			{
				id: r.productId,
				slug: r.slug,
				name: r.name,
				categorySlug: r.category,
				subcategorySlug: r.subcategory,
				basePrice: Number(r.price),
				currency: 'COP',
				coverImage: r.images.split('|')[0],
				isActive: true,
			},
			{ merge: true },
		);

		// SKU
		const skuId = `${r.productId}-${r.color}-${r.size}`.toUpperCase();

		const skuRef = productRef.collection('skus').doc(skuId);

		batch.set(skuRef, {
			id: skuId,
			productId: r.productId,
			color: r.color,
			size: r.size,
			price: Number(r.price),
			stock: Number(r.stock),
			images: r.images.split('|'),
			isActive: true,
		});
	}

	await batch.commit();

	return Response.json({ ok: true, imported: rows.length });
}
