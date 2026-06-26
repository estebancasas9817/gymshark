import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { OrderItem } from '@/libs/firebase/db/orders/get-orders';
import Image from 'next/image';

export const OrderCard = ({
	image,
	name,
	color,
	quantity,
	size,
	unitPrice,
}: OrderItem) => {
	return (
		<div className="border border-gray-200 p-4 rounded-md">
			<Stack direction="row">
				<figure className="relative w-30 h-40">
					<Image src={image} alt={name} className="object-cover" fill />
				</figure>
				<Stack className="gap-2">
					<Heading as="h2" className="text-base">
						{name}
					</Heading>
					<Text>
						<Text as="span" className="text-base">
							{color}
						</Text>{' '}
						|{' '}
						<Text as="span" className="text-base">
							{size}
						</Text>
					</Text>
					<Text className="text-base">US${unitPrice}</Text>
					<Text className="text-base">Quantity: {quantity}</Text>
				</Stack>
			</Stack>
		</div>
	);
};
