import { Stack } from '@/components/layout/stack';
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
				<Stack gap="sm">
					<Text>{name}</Text>
					<Text>
						<Text as="span">{color}</Text> |<Text as="span">{size}</Text>
					</Text>
					<Text>{unitPrice}</Text>
					<Text>Quantity: {quantity}</Text>
				</Stack>
			</Stack>
		</div>
	);
};
