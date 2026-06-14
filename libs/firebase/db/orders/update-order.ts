import { db } from '../../init-firestore';
import { OrderStatus } from './create-order';

export const updateOrder = async (orderId: string, status: OrderStatus) => {
	await db.collection('orders').doc(orderId).update({ status });
};
