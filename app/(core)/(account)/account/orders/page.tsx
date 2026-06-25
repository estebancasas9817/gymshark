import { auth } from '@/libs/auth/auth';
import { getOrders } from '@/libs/firebase/db/orders/get-orders';
import { OrdersList } from './components/orders-list';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { BackButton } from '@/components/ui/back-button';

const Page = async () => {
	const session = await auth();
	const userId = session?.user?.id;

	const orders = await getOrders(userId as string);

	return (
		<Container className="py-16" as="main">
			<BackButton text="Back to account" href="/account" />
			<Heading as="h1" size="base" className="my-10">
				ORDERS
			</Heading>
			<OrdersList orders={orders} />
		</Container>
	);
};

export default Page;
