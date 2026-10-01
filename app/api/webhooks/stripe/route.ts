import { updateStock } from '@/libs/firebase/db/products/update-products';
import { db } from '@/libs/firebase/init-firestore';
import { stripe } from '@/libs/stripe/init-stripe';
import {
	sendFailOrderEmail,
	sendSuccessOrderEmail,
} from '@/services/email-service';
import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import Stripe from 'stripe';
import { updateOrder } from '@/libs/firebase/db/orders/update-order';
import { getOrder } from '@/libs/firebase/db/orders/get-order';

export async function POST(req: Request) {
	const body = await req.text();
	const signature = (await headers()).get('stripe-signature');

	if (!signature) {
		return new Response('Missing stripe-signature header', { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err: unknown) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		console.error('❌ Webhook signature verification failed: ', errorMessage);
		return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
	}

	// *SUCESS
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;

		const userId = session.client_reference_id;
		const userEmail = session.customer_details?.email;
		const name = session.customer_details?.name ?? 'Athlete';

		if (!userId || !userEmail) {
			console.error('❌ Missing userId or userEmail in session:', session.id);
			return new Response('Missing required session fields', { status: 400 });
		}

		try {
			//* 1. Update order from pending to confirmed
			await updateOrder(session.id, 'confirmed');
			const order = await getOrder(session.id, userId);

			//* 2. Erase cart + update stock
			const cartRef = db.collection('carts').doc(userId);
			await Promise.all([cartRef.delete(), updateStock(order.items)]);

			//* 3. Invalidate cache to get fresh data for products, delete cart items and update orders
			revalidateTag(`cart-${userId}`);
			revalidateTag('products-by-category');
			revalidateTag(`orders-${userId}`);
			//* 4. Confirmation email
			await sendSuccessOrderEmail({
				email: userEmail,
				name,
				items: order.items,
				orderNumber: order.id,
				orderDate: new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}),
				subtotal: order.pricing.subtotal,
				tax: order.pricing.tax,
				shipping: order.pricing.shipping,
				total: order.pricing.total,
			});
		} catch (error) {
			console.error('❌ Error processing order:', error);
			return new Response('Internal error processing order', { status: 500 });
		}
		// * FAIL
	} else if (
		event.type === 'checkout.session.async_payment_failed' ||
		event.type === 'payment_intent.payment_failed'
	) {
		try {
			const paymentIntent = event.data.object as Stripe.PaymentIntent;
			const name =
				paymentIntent.last_payment_error?.payment_method?.billing_details.name;
			const email =
				paymentIntent.last_payment_error?.payment_method?.billing_details.email;
			paymentIntent.payment_details?.order_reference;
			await updateOrder(
				paymentIntent.payment_details?.order_reference as string,
				'cancelled',
			);
			await sendFailOrderEmail(name as string, email as string);
		} catch (error) {
			return new Response('Internal error handling failed payment', {
				status: 500,
			});
		}
	}

	return new Response(null, { status: 200 });
}
