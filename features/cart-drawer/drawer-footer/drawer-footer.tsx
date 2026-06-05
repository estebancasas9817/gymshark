'use client';

import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { PaymentMethods } from '@/components/ui/payment-methods';
import { PAYMENT_METHODS } from '@/features/footer/footer-promos/constants';
import { ShoppingBag } from 'lucide-react';

export const DrawerFooter = () => {
	return (
		<footer>
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
