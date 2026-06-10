import { auth } from '@/libs/auth/auth';
import { getWishlist } from '@/libs/firebase/db/wishlist/get-wishlist';

export async function GET() {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return Response.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const wishlistData = await getWishlist(userEmail);
		return Response.json(
			{ success: true, data: wishlistData },
			{ status: 200 },
		);
	} catch (error) {
		return Response.json({ error: 'Unexpected error' }, { status: 500 });
	}
}
