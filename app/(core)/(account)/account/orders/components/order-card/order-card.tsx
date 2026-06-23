'use client';

import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn/cn';
import Image from 'next/image';
import Link from 'next/link';
import { Order } from '@/libs/firebase/db/orders/get-orders';

const STATUS_CONFIG = {
	pending: { label: 'Order placed', progress: 25, color: 'bg-blue-500' },
	confirmed: { label: "It's confirmed", progress: 50, color: 'bg-blue-500' },
	shipped: { label: "It's on the way", progress: 75, color: 'bg-blue-500' },
	fulfilled: { label: "It's fulfilled", progress: 100, color: 'bg-blue-500' },
} as const;

const MAX_VISIBLE_THUMBNAILS = 3;

interface OrderCardProps {
	order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
	const status =
		STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ??
		STATUS_CONFIG.pending;

	const visibleItems = order.items.slice(0, MAX_VISIBLE_THUMBNAILS);
	const remainingCount = order.items.length - MAX_VISIBLE_THUMBNAILS;

	const orderedOn = order.createdAt
		? new Intl.DateTimeFormat('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}).format(new Date(order.createdAt))
		: '';

	return (
		<Stack
			direction="row"
			align="center"
			justify="between"
			className="border border-gray-200 rounded-md px-6 py-5 bg-white"
		>
			<Stack gap="sm">
				<Text as="p" className="font-bold">
					{`ORDER #${order.id.slice(-8).toUpperCase()}`}
				</Text>
				<Text as="p" size="sm" variant="tertiary">
					{`Ordered on ${orderedOn}`}
				</Text>

				<Stack gap="xs" className="mt-2">
					<Text as="p" size="sm" className="font-bold uppercase">
						Status
					</Text>
					<div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
						<div
							className={cn('h-full rounded-full', status.color)}
							style={{ width: `${status.progress}%` }}
						/>
					</div>
					<Text as="p" size="sm" variant="tertiary">
						{status.label}
					</Text>
				</Stack>
			</Stack>

			<Stack direction="row" align="center" gap="md">
				<Stack direction="row" gap="xs">
					{visibleItems.map((item, index) => {
						const isLastVisible =
							index === visibleItems.length - 1 && remainingCount > 0;
						return (
							<div
								key={`${item.skuId}-${index}`}
								className="relative w-14 h-14 rounded-sm overflow-hidden bg-gray-100"
							>
								<Image
									src={item.image}
									alt={item.name}
									fill
									className="object-cover"
									sizes="56px"
								/>
								{isLastVisible && (
									<div className="absolute inset-0 bg-black/70 flex items-center justify-center">
										<Text as="span" className="text-white font-bold text-sm">
											{`+${remainingCount}`}
										</Text>
									</div>
								)}
							</div>
						);
					})}
				</Stack>

				<Button variant="tertiary" radius="lg" className="font-sans">
					<Link href={`/account/orders/${order.id}`}>View Order</Link>
				</Button>
			</Stack>
		</Stack>
	);
};
