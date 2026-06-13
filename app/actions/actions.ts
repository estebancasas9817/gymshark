'use server';

import { auth } from '@/libs/auth/auth';
import { addToCart } from '@/libs/firebase/db/cart/add-to-cart';
import { deleteCart } from '@/libs/firebase/db/cart/delete-cart';
import { CartItemFull, getCart } from '@/libs/firebase/db/cart/get-cart';
import { hasStock } from '@/libs/firebase/db/checkout/utils';
import { verifyAnonymousCartPrices } from '@/libs/firebase/db/checkout/verify-anonymous-cart-prices';
import { addToWishlist } from '@/libs/firebase/db/wishlist/add-to-wishlist';
import { deleteWishlist } from '@/libs/firebase/db/wishlist/delete-wishlist';
import { stripe } from '@/libs/stripe/init-stripe';
import { CartItem } from '@/types/cart';
import { WishlistItem } from '@/types/wishlist';
import { revalidateTag } from 'next/cache';

export const addToCartAction = async (
	cart: CartItem | CartItem[],
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToCart({ cart, userEmail });
		revalidateTag(`cart-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const deleteCartAction = async (
	cart: CartItem,
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}
		const res = await deleteCart({ cart, userEmail });
		revalidateTag(`cart-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const addToWishlistAction = async (
	wishlist: WishlistItem | WishlistItem[],
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToWishlist({ wishlist, userEmail });
		revalidateTag(`wishlist-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const deleteWishlistAction = async (
	wishlist: WishlistItem,
): Promise<{
	status: 401 | 500 | 200;
	error?: string;
}> => {
	try {
		const session = await auth();
		const userEmail = session?.user?.email;
		if (!userEmail) {
			return { error: 'Unauthorized', status: 401 };
		}
		const res = await deleteWishlist({ wishlist, userEmail });
		revalidateTag(`wishlist-${userEmail}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

export const addCheckoutSession = async (
	email: string | null | undefined,
	localStorageProducts: CartItemFull[] = [],
): Promise<{ status: 200 | 500; message?: string; url?: string | null }> => {
	try {
		const session = await auth();
		let products: CartItemFull[];
		// * we need to revalidate before so we can use fresh data from db instead of cached data to know if there is still stock.
		revalidateTag(`cart-${session?.user?.email}`);
		if (session?.user?.email) {
			products = await getCart(session?.user?.email);
		} else {
			products = await verifyAnonymousCartPrices(localStorageProducts);
		}

		if (!products.length) {
			return { status: 500, message: 'Cart is empty' };
		}
		if (!hasStock(products)) {
			return { status: 500, message: 'There is no stock' };
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			success_url: `${process.env.APP_URL}/checkout/success`,
			cancel_url: `${process.env.APP_URL}/checkout/cancel`,
			line_items: products.map((product) => ({
				price_data: {
					currency: 'usd',
					unit_amount: product.price * 100,
					product_data: {
						name: product.name,
						images: [product.image],
					},
				},
				quantity: product.quantity,
			})),
			mode: 'payment',
			...(email && { customer_email: email }),
			client_reference_id: session?.user?.id,
			metadata: {
				lineItems: JSON.stringify(
					products.map((p) => ({
						productId: p.productId,
						skuId: p.skuId,
						size: p.size,
						quantity: p.quantity,
					})),
				),
			},
		});

		return { status: 200, url: checkoutSession.url };
	} catch (error) {
		return { status: 500, message: 'Unexpected error' };
	}
};
