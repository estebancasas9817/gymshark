import { Stack } from '@/components/layout/stack';
import { ProgressionBar } from '@/features/progression-bar';
import { OrderSummaryCard } from '../order-summary-card';
import { Suspense } from 'react';

interface OrderSidebar {
	orderStatus: string;
	orderId: string;
}
export const OrderSideBar = ({ orderStatus, orderId }: OrderSidebar) => {
	return (
		<Stack as="aside" className="basis-1/4">
			<ProgressionBar orderStatus={orderStatus} fullWidth />
			<Suspense>
				<OrderSummaryCard orderId={orderId} />
			</Suspense>
		</Stack>
	);
};
