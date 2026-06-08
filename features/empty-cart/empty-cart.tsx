import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import Link from 'next/link';

interface EmptyCartProps {
	onCloseDrawer: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onCloseDrawer }) => {
	return (
		<div className="flex flex-1 flex-col items-center justify-center bg-white px-8 py-12 font-sans text-center">
			<div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#F2F2F2]">
				<ShoppingBag className="h-14 w-14 text-[#767676]" strokeWidth={1.2} />
			</div>

			<Heading
				as="h6"
				className="text-md font-black uppercase tracking-wide text-[#111111]"
			>
				Your bag is empty
			</Heading>
			<Text as="p" className="mt-1.5 text-[14px] text-[#767676]">
				There are no products in your bag
			</Text>

			<div className="mt-6 flex w-full flex-col gap-3 max-w-70">
				<Link
					href={'/men'}
					className="py-4 w-full rounded-full bg-black text-[14px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
					onClick={onCloseDrawer}
				>
					Shop Mens
				</Link>
				<Link
					href={'/women'}
					onClick={onCloseDrawer}
					className="py-4 w-full rounded-full bg-black text-[14px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
				>
					Shop Womens
				</Link>
			</div>
		</div>
	);
};
