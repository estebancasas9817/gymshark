import { db } from '../../init-firestore';

export const updateOrder = async (orderId: string) => {
	await db.collection('orders').doc(orderId).update({ status: 'confirmed' });
};
