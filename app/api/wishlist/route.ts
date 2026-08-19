import { auth } from '@/libs/auth/auth';
import { getWishlist } from '@/libs/firebase/db/wishlist/get-wishlist';

export async function GET() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return Response.json(
				{ error: 'Unauthorized', status: 'UNAUTHORIZED' },
				{ status: 401 },
			);
		}
		const wishlistData = await getWishlist(userId);
		return Response.json(
			{ success: true, data: wishlistData, status: 'SUCCESS' },
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{ error: 'Unexpected error', status: 'UNEXPECTED_ERROR' },
			{ status: 500 },
		);
	}
}
