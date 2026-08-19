'use server';

import { auth } from '@/libs/auth/auth';
import { addToCart } from '@/libs/firebase/db/cart/add-to-cart';
import { deleteCart } from '@/libs/firebase/db/cart/delete-cart';
import { CartItemFull, getCart } from '@/libs/firebase/db/cart/get-cart';
import { hasStock } from '@/libs/firebase/db/checkout/utils';
import { verifyAnonymousCartPrices } from '@/libs/firebase/db/checkout/verify-anonymous-cart-prices';
import {
	createOrder,
	OrderLineItem,
} from '@/libs/firebase/db/orders/create-order';
import { addToWishlist } from '@/libs/firebase/db/wishlist/add-to-wishlist';
import { deleteWishlist } from '@/libs/firebase/db/wishlist/delete-wishlist';
import { stripe } from '@/libs/stripe/init-stripe';
import { CartItem } from '@/types/cart';
import { WishlistItem } from '@/types/wishlist';
import { revalidateTag } from 'next/cache';

type AddToCartActionPromise =
	| {
			status: 200;
	  }
	| {
			status: 401;
			error: string;
	  }
	| {
			status: 500;
			error: string;
	  };

export const addToCartAction = async (
	cart: CartItem | CartItem[],
): Promise<AddToCartActionPromise> => {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToCart({ cart, userId });
		revalidateTag(`cart-${userId}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

type DeleteCartActionPromise =
	| {
			status: 200;
	  }
	| {
			status: 401;
			error: string;
	  }
	| {
			status: 500;
			error: string;
	  };

export const deleteCartAction = async (
	cart: CartItem,
): Promise<DeleteCartActionPromise> => {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return { error: 'Unauthorized', status: 401 };
		}
		const res = await deleteCart({ cart, userId });
		revalidateTag(`cart-${userId}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

type AddToWishlistActionPromise =
	| {
			status: 200;
	  }
	| {
			status: 401;
			error: string;
	  }
	| {
			status: 500;
			error: string;
	  };

export const addToWishlistAction = async (
	wishlist: WishlistItem | WishlistItem[],
): Promise<AddToWishlistActionPromise> => {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return { error: 'Unauthorized', status: 401 };
		}

		const res = await addToWishlist({ wishlist, userId });
		revalidateTag(`wishlist-${userId}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

type DeleteWishlistActionPromise =
	| {
			status: 200;
	  }
	| {
			status: 401;
			error: string;
	  }
	| {
			status: 500;
			error: string;
	  };

export const deleteWishlistAction = async (
	wishlist: WishlistItem,
): Promise<DeleteWishlistActionPromise> => {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!userId) {
			return { error: 'Unauthorized', status: 401 };
		}
		const res = await deleteWishlist({ wishlist, userId });
		revalidateTag(`wishlist-${userId}`);
		return res;
	} catch (error) {
		return { error: 'Unexpected error', status: 500 };
	}
};

type AddCheckoutSessionPromise =
	| {
			status: 200;
			url: string | null;
	  }
	| {
			status: 401;
			message: string;
	  }
	| {
			status: 500;
			message: string;
	  };

export const addCheckoutSession = async (
	localStorageProducts: CartItemFull[] = [],
): Promise<AddCheckoutSessionPromise> => {
	try {
		const session = await auth();
		let products: CartItemFull[];
		// * we need to revalidate before so we can use fresh data from db instead of cached data to know if there is still stock.
		if (session?.user?.id) {
			revalidateTag(`cart-${session.user.id}`);
			products = await getCart(session.user.id);
		} else {
			products = await verifyAnonymousCartPrices(localStorageProducts);
		}

		if (!products.length) {
			return { status: 500, message: 'Cart is empty' };
		}
		if (!hasStock(products)) {
			return { status: 500, message: 'There is no stock' };
		}
		const lineItems: OrderLineItem[] = products.map((item) => ({
			productId: item.productId,
			skuId: item.skuId,
			size: item.size,
			quantity: item.quantity,
			unitPrice: item.price,
			lineTotal: item.price * item.quantity,
			name: item.name ?? '',
			image: item.image ?? '',
			color: item.color ?? '',
		}));

		const checkoutSession = await stripe.checkout.sessions.create({
			success_url: `${process.env.APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
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
			...(session?.user?.email && { customer_email: session?.user?.email }),
			client_reference_id: session?.user?.id,
			shipping_address_collection: {
				allowed_countries: ['US', 'CO', 'MX', 'ES', 'GB', 'CA'],
			},
		});
		if (session?.user?.id && session.user.email) {
			await createOrder({
				session: checkoutSession,
				userId: session.user.id,
				userEmail: session.user.email,
				lineItems,
			});
		}

		return { status: 200, url: checkoutSession.url };
	} catch (error) {
		return { status: 500, message: 'Unexpected error' };
	}
};
