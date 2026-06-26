import { Heading } from '@/components/ui/heading';
import { auth } from '@/libs/auth/auth';
import { getOrder } from '@/libs/firebase/db/orders/get-order';
import { OrderCard } from '../order-card';
import { Stack } from '@/components/layout/stack';

interface OrderListProps {
	orderId: string;
}

export const OrderList = async ({ orderId }: OrderListProps) => {
	const session = await auth();
	const { items } = await getOrder(orderId, session?.user?.id as string);

	return (
		<div className="flex-1">
			<Heading as="h3" size="base" className="mb-8">
				ORDER INFORMATION
			</Heading>
			<Stack gap="lg">
				{items.map(
					({
						color,
						image,
						lineTotal,
						name,
						quantity,
						size,
						unitPrice,
						productId,
						skuId,
					}) => (
						<OrderCard
							key={`${skuId} ${size}`}
							color={color}
							image={image}
							lineTotal={lineTotal}
							name={name}
							quantity={quantity}
							size={size}
							unitPrice={unitPrice}
							productId={productId}
							skuId={skuId}
						/>
					),
				)}
			</Stack>
		</div>
	);
};
