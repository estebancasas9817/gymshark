import { auth } from '@/libs/auth/auth';
import { getCart } from '@/libs/firebase/db/cart/get-cart';

export async function GET() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const cartData = await getCart(userId);
		return Response.json({ success: true, data: cartData }, { status: 200 });
	} catch (error) {
		return Response.json({ error: 'Unexpected error' }, { status: 500 });
	}
}
