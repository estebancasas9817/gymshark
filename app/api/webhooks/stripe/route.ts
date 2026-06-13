import { updateStock } from '@/libs/firebase/db/products/update-products';
import { db } from '@/libs/firebase/init-firestore';
import { stripe } from '@/libs/stripe/init-stripe';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export async function POST(req: Request) {
	const body = await req.text();
	const signature = (await headers()).get('stripe-signature')!;

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err: any) {
		return new Response(`Webhook Error: ${err.message}`, { status: 400 });
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;
		const userId = session.client_reference_id;
		const checkoutSessionId = session.id;
		const userEmail = session.customer_details?.email;
		const metadata = session.metadata;
		const totalAmount = metadata?.lineItems;
		const lineItems = JSON.parse(metadata?.lineItems ?? '[]');
		console.log(`💰 Payment confirmed for ${session.id}`);
		try {
			// call fb to remove cart and update stock of products
			if (userEmail) {
				const cartRef = db.collection('carts').doc(userEmail);
				await cartRef.delete();
				await updateStock(lineItems);
				revalidateTag(`cart-${userEmail}`);
				revalidateTag('products-by-category');
				// here I should call resent for the confirmation order and also set my order in firebase
			}
		} catch (error) {
			return new Response('Database Error. Could not update db', {
				status: 500,
			});
		}
	}

	return new Response(null, { status: 200 });
}
