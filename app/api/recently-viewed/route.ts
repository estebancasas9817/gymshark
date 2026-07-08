import { getProduct } from '@/libs/firebase/db/products/get-product';

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);

	const productSlugs = searchParams.getAll('productSlug');
	const colors = searchParams.getAll('color');
	const mergedProducts = productSlugs.map((slug, index) => {
		return { productSlug: slug, color: colors[index] };
	});
	const promiseArray = mergedProducts.map(({ productSlug, color }) => {
		return getProduct(productSlug, color);
	});
	try {
		const recentlyViewedProducts = await Promise.all(promiseArray);
		return Response.json(
			{ success: true, data: recentlyViewedProducts.filter(Boolean) },
			{ status: 200 },
		);
	} catch (error) {
		return Response.json({ error: 'Unexpected error' }, { status: 500 });
	}
};
