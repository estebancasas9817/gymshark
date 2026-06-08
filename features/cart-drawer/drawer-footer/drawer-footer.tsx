'use client';

import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { PaymentMethods } from '@/components/ui/payment-methods';
import { PAYMENT_METHODS } from '@/features/footer/footer-promos/constants';
import { cn } from '@/utils/cn/cn';
import { ShoppingBag } from 'lucide-react';

interface DrawerFooterProps {
	isScrolling: boolean;
}

export const DrawerFooter = ({ isScrolling }: DrawerFooterProps) => {
	return (
		<footer
			className={cn(
				'sticky bottom-0 bg-secondary px-4 pt-4 w-full h-30',
				isScrolling &&
					'border-t border-gray-100 shadow-[0_-0.9rem_0.9rem_0_rgba(0,0,0,0.11)]',
			)}
		>
			<Button radius="lg" className="w-full flex gap-4 mb-4 font-sans text-sm">
				<ShoppingBag size={18} />
				CHECKOUT SECURELY
			</Button>
			<Stack direction="row" justify="center">
				<Stack direction="row" as="ul">
					{PAYMENT_METHODS.map(({ alt, src }) => (
						<li key={alt}>
							<PaymentMethods src={src} alt={alt} />
						</li>
					))}
				</Stack>
			</Stack>
		</footer>
	);
};
