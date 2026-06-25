import { PageProps } from '@/types/next';
import { RouteParams } from './types/order-types';
import { auth } from '@/libs/auth/auth';
import { getOrder } from '@/libs/firebase/db/orders/get-order';
import { redirect } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { BackButton } from '@/components/ui/back-button';
import { Heading } from '@/components/ui/heading';

const Page = async (props: PageProps<RouteParams>) => {
	const [{ orderId }, session] = await Promise.all([props.params, auth()]);
	const order = await getOrder(orderId, session?.user?.id as string);
	if (!order) {
		redirect('/not-found');
	}
	const { id } = order;
	//TODO: Update to use a translation
	const orderHeading = `ORDER #${id.slice(-8).toUpperCase()}`;

	return (
		<Container as="main" className="py-16">
			<BackButton text="Back to orders" href="/account/orders" />
			<Heading as="h1" size="base" className="my-10">
				{orderHeading}
			</Heading>
		</Container>
	);
};

export default Page;
