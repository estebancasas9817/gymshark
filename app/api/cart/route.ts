import { auth } from '@/libs/auth/auth';
import { getCart } from '@/libs/firebase/db/cart/get-cart';

export async function GET() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json(
				{ error: 'Unauthorized', success: false, status: 'UNAUTHORIZED' },
				{ status: 401 },
			);
		}
		const cartData = await getCart(userId);
		return Response.json(
			{ success: true, data: cartData, status: 'SUCCESS' },
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{ error: 'Unexpected_error', success: false, status: 'UNEXPECTED_ERROR' },
			{ status: 500 },
		);
	}
}
