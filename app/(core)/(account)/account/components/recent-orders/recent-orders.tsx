import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { EmptyOrders } from '@/components/ui/emty-orders';
import { Heading } from '@/components/ui/heading';
import { auth } from '@/libs/auth/auth';
import { getOrders } from '@/libs/firebase/db/orders/get-orders';
import Link from 'next/link';
import { OrdersSummary } from '../orders-summary';

export const RecentOrders = async () => {
	const session = await auth();
	const userId = session?.user?.id;
	const orders = await getOrders(userId as string);
	const ordersCount = orders.length;
	const hasOrders = ordersCount > 0;

	return (
		<div className="basis-1/2 bg-gray-100 p-8">
			<Heading as="h6" className="text-md">
				ORDERS
			</Heading>
			<Stack>
				<Conditional
					test={hasOrders}
					fallback={
						<>
							<EmptyOrders />
							<Stack direction="row" align="center" justify="center">
								<Button radius="md" className="px-8 text-sm font-sans">
									<Link href="/women">SHOP WOMENS</Link>
								</Button>
								<Button radius="md" className="px-8 text-sm font-sans">
									<Link href="/men">SHOP MENS</Link>
								</Button>
							</Stack>
						</>
					}
				>
					<OrdersSummary orderCount={ordersCount} />
				</Conditional>
			</Stack>
		</div>
	);
};
