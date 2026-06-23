'use client';

import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface OrdersSummaryProps {
	orderCount: number;
}

export const OrdersSummary = ({ orderCount }: OrdersSummaryProps) => {
	return (
		<Stack
			align="center"
			justify="center"
			gap="md"
			className="bg-gray-100 rounded-md py-12 px-8 text-center relative overflow-hidden"
		>
			<span className="absolute top-10 left-12 w-1.5 h-1.5 rounded-full bg-gray-300" />
			<span className="absolute bottom-14 right-16 w-1.5 h-1.5 rounded-full bg-gray-300" />

			<svg
				width="96"
				height="96"
				viewBox="0 0 96 96"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M34 30C34 22 40 16 48 16C56 16 62 22 62 30"
					stroke="#111111"
					strokeWidth="1.5"
					fill="none"
				/>
				<rect
					x="22"
					y="30"
					width="52"
					height="46"
					rx="2"
					stroke="#111111"
					strokeWidth="1.5"
					fill="white"
				/>
				<line
					x1="32"
					y1="44"
					x2="56"
					y2="44"
					stroke="#D1D5DB"
					strokeWidth="1.5"
				/>
				<line
					x1="32"
					y1="52"
					x2="56"
					y2="52"
					stroke="#D1D5DB"
					strokeWidth="1.5"
				/>
				<line
					x1="32"
					y1="60"
					x2="48"
					y2="60"
					stroke="#D1D5DB"
					strokeWidth="1.5"
				/>
				<circle cx="64" cy="64" r="13" fill="#111111" />
				<path
					d="M58.5 64L62.5 68L70 60"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
			</svg>

			<Stack gap="xs" align="center">
				<Text as="p" className="font-bold">
					{orderCount === 1
						? 'You have 1 order'
						: `You have ${orderCount} orders`}
				</Text>
				<Text as="p" size="sm" variant="tertiary">
					Track deliveries and view your order history anytime.
				</Text>
			</Stack>

			<Button radius="md" className="px-8 text-sm font-sans">
				<Link href="/account/orders">View All Orders</Link>
			</Button>
		</Stack>
	);
};
