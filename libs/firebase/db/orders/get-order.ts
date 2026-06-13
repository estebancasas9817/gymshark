import { db } from '../../init-firestore';
import { Order } from './create-order';

export const getOrder = async (orderId: string): Promise<Order> => {
	const orderDoc = await db.collection('orders').doc(orderId).get();
	return orderDoc.data() as Order;
};
