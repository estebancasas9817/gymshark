import { db } from '@/libs/firebase/init-firestore';
import { FieldValue } from 'firebase-admin/firestore';
import Stripe from 'stripe';

// Refleja exactamente lo que guardas en metadata + campos display
export interface OrderLineItem {
	productId: string;
	skuId: string;
	size: string;
	quantity: number;
	unitPrice: number; // en USD (no centavos) — igual que tu CartItemFull
	lineTotal: number;
	// campos display — vendrán del metadata extendido
	name: string;
	image: string;
	color: string;
}

export type OrderStatus =
	| 'confirmed'
	| 'shipped'
	| 'delivered'
	| 'cancelled'
	| 'pending';

export interface Order {
	id: string;
	userId: string;
	userEmail: string;
	status: OrderStatus;
	items: OrderLineItem[];
	pricing: {
		subtotal: number;
		tax: number;
		shipping: number;
		total: number;
	};
	stripeSessionId: string;
	createdAt: FirebaseFirestore.FieldValue;
	updatedAt: FirebaseFirestore.FieldValue;
}

export interface CreateOrderParams {
	session: Stripe.Checkout.Session;
	userId: string;
	userEmail: string;
	lineItems: OrderLineItem[];
}

const centsToUsd = (cents: number | null): number =>
	Math.round(cents ?? 0) / 100;

export async function createOrder({
	session,
	userId,
	userEmail,
	lineItems,
}: CreateOrderParams) {
	const orderRef = db.collection('orders').doc(session.id);

	const existing = await orderRef.get();
	if (existing.exists) {
		console.warn(
			`⚠️ Order ${session.id} already exists — skipping duplicate webhook`,
		);
		return existing.data() as Order;
	}

	const details = session.total_details;
	const pricing = {
		subtotal: centsToUsd(session.amount_subtotal),
		tax: centsToUsd(details?.amount_tax ?? null),
		shipping: centsToUsd(details?.amount_shipping ?? null),
		total: centsToUsd(session.amount_total),
	};

	const order: Order = {
		id: session.id,
		userId,
		userEmail,
		status: 'pending',
		items: lineItems,
		pricing,
		stripeSessionId: session.id,
		createdAt: FieldValue.serverTimestamp(),
		updatedAt: FieldValue.serverTimestamp(),
	};

	await orderRef.set(order);
}
