import React from 'react';
import { Divider } from '../divider';
import { Text } from '../text';
import { Heading } from '../heading';
import { Stack } from '@/components/layout/stack';

interface OrderSummaryProps {
	subTotal: number;
	shippingCost: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
	subTotal,
	shippingCost,
}) => {
	const total = subTotal + shippingCost;

	// Helper para formatear precios idéntico a Gymshark ($278 en lugar de $278.00)
	const formatPrice = (amount: number) => {
		return `$${amount.toFixed(2).replace('.00', '')}`;
	};

	return (
		<div className="w-full bg-white py-4 font-sans text-[#111111]">
			<Heading
				as="h6"
				className="mb-4 text-sm font-black uppercase tracking-wide"
			>
				Order Summary
			</Heading>

			<div className="flex flex-col gap-3 text-[15px]">
				{/* Sub Total */}
				<Stack direction="row" align="center" justify="between">
					<Text as="span" className="text-gray-700 ">
						Sub Total
					</Text>
					<Text as="span" className="text-gray-700">
						{formatPrice(subTotal)}
					</Text>
				</Stack>

				<Stack direction="row" align="center" justify="between">
					<Text as="span" className="text-gray-700">
						Selected Shipping
					</Text>
					<Text as="span" className="text-gray-700">
						{formatPrice(shippingCost)}
					</Text>
				</Stack>

				<Divider />

				<div className="flex justify-between items-center text-[16px] font-black">
					<Text as="span" className="uppercase tracking-wide text-sm">
						Total
					</Text>
					<Text as="span">{formatPrice(total)}</Text>
				</div>
			</div>
		</div>
	);
};
