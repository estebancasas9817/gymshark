'use client';

import { addCheckoutSession } from '@/app/actions/actions';
import { useCart } from '@/app/context/cart-context';
import { useDrawer } from '@/app/context/drawer-context';
import { useToast } from '@/app/context/toast-context';
import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { PaymentMethods } from '@/components/ui/payment-methods';
import { PAYMENT_METHODS } from '@/features/footer/footer-promos/constants';
import { cn } from '@/utils/cn/cn';
import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';

interface CartDrawerFooterProps {
	isScrolling: boolean;
}

export const CartDrawerFooter = ({ isScrolling }: CartDrawerFooterProps) => {
	const { optimisticState } = useCart();
	const { drawer } = useDrawer();
	const toast = useToast();
	const [isPending, setIsPending] = useState<boolean>(false);

	const shouldDisplayCartDrawerFooter =
		optimisticState.length > 0 && drawer === 'cart';

	const handleCheckout = async () => {
		setIsPending(true);
		const { status, url } = await addCheckoutSession(optimisticState);
		if (status === 200 && url) {
			toast.success('Redirecting...');
			window.location.href = url;
		} else {
			toast.error('Something went wrong.');
		}
		setIsPending(false);
	};

	return (
		<Conditional test={shouldDisplayCartDrawerFooter}>
			<footer
				className={cn(
					'sticky bottom-0 bg-secondary px-4 pt-4 w-full h-30',
					isScrolling &&
						'border-t border-gray-100 shadow-[0_-0.9rem_0.9rem_0_rgba(0,0,0,0.11)]',
				)}
			>
				<Button
					radius="lg"
					className="w-full flex gap-4 mb-4 font-sans text-sm"
					onClick={handleCheckout}
				>
					<Conditional
						test={isPending}
						fallback={
							<>
								<ShoppingBag size={18} />
								CHECKOUT SECURELY
							</>
						}
					>
						<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
					</Conditional>
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
		</Conditional>
	);
};
