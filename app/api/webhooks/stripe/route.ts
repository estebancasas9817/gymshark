import {
	createOrder,
	OrderLineItem,
} from '@/libs/firebase/db/orders/create-order';
import { updateStock } from '@/libs/firebase/db/products/update-products';
import { db } from '@/libs/firebase/init-firestore';
import { stripe } from '@/libs/stripe/init-stripe';
import { sendOrderEmail } from '@/services/email-service';
import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import Stripe from 'stripe';

// Stripe metadata solo tiene los campos que guardaste en addCheckoutSession.
// Definimos el tipo exacto para no asumir campos que no existen.
interface MetadataLineItem {
	productId: string;
	skuId: string;
	size: string;
	quantity: number;
	price: number; // USD
	name?: string;
	image?: string;
	color?: string;
}

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
	} catch (err: any) {
		console.error('❌ Webhook signature verification failed:', err.message);
		return new Response(`Webhook Error: ${err.message}`, { status: 400 });
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;

		const userId = session.client_reference_id;
		const userEmail = session.customer_details?.email;
		const name = session.customer_details?.name ?? 'Athlete';

		if (!userId || !userEmail) {
			console.error('❌ Missing userId or userEmail in session:', session.id);
			// Retornamos 400 para que Stripe NO reintente — es un error nuestro de configuración
			return new Response('Missing required session fields', { status: 400 });
		}

		const rawItems: MetadataLineItem[] = JSON.parse(
			session.metadata?.lineItems ?? '[]',
		);

		if (!rawItems.length) {
			console.error('❌ Empty lineItems in metadata for session:', session.id);
			return new Response('Empty lineItems', { status: 400 });
		}

		// Mapeamos MetadataLineItem → OrderLineItem
		// name/image/color tienen fallback hasta que actualices addCheckoutSession
		const lineItems: OrderLineItem[] = rawItems.map((item) => ({
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

		try {
			//* 1. Create order
			const order = await createOrder({
				session,
				userId,
				userEmail,
				lineItems,
			});

			//* 2. Erase cart + update stock
			const cartRef = db.collection('carts').doc(userId);
			await Promise.all([cartRef.delete(), updateStock(lineItems)]);

			//* 3. Invalidate cache to get fresh data for products
			revalidateTag(`cart-${userId}`);
			revalidateTag('products-by-category');

			//* 4. Confirmation email
			await sendOrderEmail({
				email: userEmail,
				name,
				items: lineItems,
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

			console.log(`✅ Order ${order.id} processed for ${userEmail}`);
		} catch (error) {
			console.error('❌ Error processing order:', error);
			return new Response('Internal error processing order', { status: 500 });
		}
	}

	return new Response(null, { status: 200 });
}
