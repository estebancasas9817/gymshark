import { Stack } from '@/components/layout/stack';
import { Order } from '@/libs/firebase/db/orders/get-orders';
import { OrderCard } from '../order-card';

export const OrdersList = ({ orders }: { orders: Order[] }) => {
	return (
		<Stack gap="md" direction="column">
			{orders.map((order) => (
				<OrderCard key={order.id} order={order} />
			))}
		</Stack>
	);
};
