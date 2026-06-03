import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { EmptyOrders } from '@/components/ui/emty-orders';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';

export const RecentOrders = () => {
	return (
		<div className="basis-1/2 bg-gray-100 p-8">
			<Heading as="h6" className="text-md">
				ORDERS
			</Heading>
			<Stack>
				{/* TODO: THIS NEEDS TO CHANGE IF THE USER ALREADY HAVE AN ORDER OR NOT */}
				<EmptyOrders />
				<Stack direction="row" align="center" justify="center">
					<Button radius="md" className="px-8 text-sm font-sans">
						<Link href={'/women'}>SHOP WOMENS</Link>
					</Button>
					<Button radius="md" className="px-8 text-sm font-sans">
						<Link href={'/men'}>SHOP WOMENS</Link>
					</Button>
				</Stack>
			</Stack>
		</div>
	);
};
