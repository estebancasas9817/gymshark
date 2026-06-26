import { Stack } from '@/components/layout/stack';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { auth } from '@/libs/auth/auth';
import { getOrder } from '@/libs/firebase/db/orders/get-order';
import { capitalize } from '@/utils/capitalize/capitalize';
import { cn } from '@/utils/cn/cn';

interface OrderSummaryCardProps {
	orderId: string;
}

export const OrderSummaryCard = async ({ orderId }: OrderSummaryCardProps) => {
	const session = await auth();
	const { createdAt, status, pricing } = await getOrder(
		orderId,
		session?.user?.id as string,
	);
	const sessionName = session?.user?.name;
	const orderedOn = createdAt
		? new Intl.DateTimeFormat('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}).format(new Date(createdAt))
		: '';

	return (
		<div className="bg-gray-100 mt-8 p-5">
			<Stack gap="sm">
				<Heading as="h4" size="sm" className="text-gray-700">
					{sessionName}
				</Heading>
				<Text className="text-gray-700">{`Placed on ${orderedOn}`}</Text>
				<Text className="text-base mb-8 text-gray-700">
					Payment Status:{' '}
					<Text as="span" className="font-bold text-base">
						{capitalize(status)}
					</Text>
				</Text>
			</Stack>
			<Divider />
			<Stack gap="sm" className="mt-8">
				{Object.entries(pricing).map(([key, value]) => {
					const isTotal = key === 'total';
					return (
						<Stack
							direction="row"
							as="ul"
							key={key}
							justify="between"
							align="center"
						>
							<li
								className={cn(
									'text-gray-700',
									isTotal &&
										'font-bold text-base uppercase font-sans text-primary',
								)}
							>
								{capitalize(key)}
							</li>
							<li
								className={cn(
									'text-gray-700',
									isTotal && 'font-bold text-base font-sans',
								)}
							>
								{isTotal ? `US$${value}` : value}
							</li>
						</Stack>
					);
				})}
			</Stack>
		</div>
	);
};
