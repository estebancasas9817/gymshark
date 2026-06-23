import { unstable_cache } from 'next/cache';
import { db } from '../../init-firestore';

export type OrderItem = {
	color: string;
	image: string;
	lineTotal: number;
	name: string;
	productId: string;
	quantity: number;
	size: string;
	skuId: string;
	unitPrice: number;
};

export type OrderPricing = {
	shipping: number;
	subtotal: number;
	tax: number;
	total: number;
};

export type Order = {
	id: string; // same as stripeSessionId / doc id
	items: OrderItem[];
	pricing: OrderPricing;
	status: string;
	stripeSessionId: string;
	userEmail: string;
	userId: string;
	createdAt: number | null;
	updatedAt: number | null;
};

export const getOrders = (userId: string): Promise<Order[]> => {
	return unstable_cache(
		async () => {
			const ordersSnap = await db
				.collection('orders')
				.where('userId', '==', userId)
				.orderBy('createdAt', 'desc')
				.get();

			if (ordersSnap.empty) return [];

			return ordersSnap.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					items: data.items ?? [],
					pricing: data.pricing,
					status: data.status,
					stripeSessionId: data.stripeSessionId,
					userEmail: data.userEmail,
					userId: data.userId,
					createdAt: data.createdAt?.toMillis?.() ?? null,
					updatedAt: data.updatedAt?.toMillis?.() ?? null,
				} as Order;
			});
		},
		['orders', userId],
		{ tags: [`orders-${userId}`] },
	)();
};
