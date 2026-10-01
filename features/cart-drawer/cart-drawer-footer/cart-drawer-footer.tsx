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
		const res = await addCheckoutSession(optimisticState);
		if (res.status === 200 && res.url) {
			toast.success('Redirecting...');
			window.location.href = res.url;
		} else {
			toast.error('Something went wrong.');
		}
		setIsPending(false);
	};

	const handleClick = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success('Link copied');
		} catch (err) {
			toast.error('Error copying URL');
		}
	};

	return (
		<Conditional test={shouldDisplayCartDrawerFooter}>
			<footer
				className={cn(
					'sticky bottom-20 bg-secondary px-4 pt-4 w-full h-30',
					isScrolling &&
						'border-t border-gray-100 shadow-[0_-0.9rem_0.9rem_0_rgba(0,0,0,0.11)]',
				)}
			>
				<div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3">
					<span className="text-blue-500 text-base shrink-0 mt-0.5">🧪</span>
					<div className="min-w-0 flex-1">
						<p className="text-xs font-semibold text-blue-800 leading-tight">
							This is a demo store. Use this test card for paying
						</p>
						<button
							onClick={handleClick}
							className="flex items-center gap-1.5 mt-0.5 group cursor-pointer"
							title="Click to copy"
						>
							<p className="text-xs text-blue-700 font-mono tracking-wide">
								4242 4242 4242 4242
							</p>
							<span className="text-blue-400 group-hover:text-blue-600 transition-colors">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<rect x="9" y="9" width="13" height="13" rx="2" />
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
								</svg>
							</span>
						</button>
						<p className="text-xs text-blue-600 mt-0.5">
							Exp: Any future date · CVC: Any 3 digits
						</p>
					</div>
				</div>
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
