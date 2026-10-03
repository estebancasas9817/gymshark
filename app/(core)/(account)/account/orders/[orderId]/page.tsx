import { PageProps } from '@/types/next';
import { RouteParams } from './types/order-types';
import { auth } from '@/libs/auth/auth';
import { getOrder } from '@/libs/firebase/db/orders/get-order';
import { redirect } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { BackButton } from '@/components/ui/back-button';
import { Heading } from '@/components/ui/heading';
import { Stack } from '@/components/layout/stack';
import { OrderSideBar } from './components/order-sidebar';
import { OrderList } from './components/order-list';
import { Suspense } from 'react';
import { Metadata } from 'next';

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { orderId } = await params;

	return {
		title: `Order #${orderId} | Fit Store`,
	};
}

const Page = async (props: PageProps<RouteParams>) => {
	const [{ orderId }, session] = await Promise.all([props.params, auth()]);

	const order = await getOrder(orderId, session?.user?.id as string);
	if (!order) {
		redirect('/not-found');
	}
	const { id, status } = order;
	const orderHeading = `ORDER #${id.slice(-8).toUpperCase()}`;

	return (
		<Container as="main" className="py-16">
			<BackButton text="Back to orders" href="/account/orders" />
			<Heading as="h1" size="base" className="my-10">
				{orderHeading}
			</Heading>
			<Stack direction="column" className="lg:flex-row gap-16">
				<OrderSideBar orderStatus={status} orderId={orderId} />
				<Suspense>
					<OrderList orderId={orderId} />
				</Suspense>
			</Stack>
		</Container>
	);
};

export default Page;
