import { unstable_cache } from 'next/cache';
import { db } from '../../init-firestore';
import { cache } from 'react';
import { Order } from './get-orders';

export const _getOrder = async (
	orderId: string,
	userId: string,
): Promise<Order> => {
	const orderSnap = await db
		.collection('orders')
		.where('userId', '==', userId)
		.where('id', '==', orderId)
		.get();
	return {
		...(orderSnap.docs[0]?.data() as Order),
		createdAt: orderSnap.docs[0]?.data().createdAt?.toMillis?.() ?? null,
	};
};

export const getOrder = cache(async (orderId: string, userId: string) => {
	const cachedFn = unstable_cache(
		() => _getOrder(orderId, userId),
		['orderId', orderId, userId],
		{
			tags: [`orderId-${userId}`],
		},
	);

	return cachedFn();
});
