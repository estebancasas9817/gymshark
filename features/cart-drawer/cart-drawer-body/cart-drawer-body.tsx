'use client';

import { useCart } from '@/app/context/cart-context';
import { useDrawer } from '@/app/context/drawer-context';
import { Conditional } from '@/components/layout/conditional';
import { CartNotice } from '@/components/ui/cart-notice';
import { DiscountCode } from '@/components/ui/discount-code';
import { OrderSummary } from '@/components/ui/order-summary';
import { ShippingProgressBar } from '@/components/ui/shipping-progress-bar';
import { CartItem } from '@/features/cart-item';
import { EmptyCart } from '@/features/empty-cart';
import { cn } from '@/utils/cn/cn';

export const CartDrawerBody = () => {
	const { optimisticState, isPending } = useCart();
	const { handleCloseDrawer } = useDrawer();
	const total = optimisticState.reduce((acc, item) => {
		const finalPrice = item.price + (item.discount ?? 0);
		const total = acc + finalPrice;
		return total;
	}, 0);

	return (
		<Conditional
			test={optimisticState.length > 0}
			fallback={<EmptyCart onCloseDrawer={handleCloseDrawer} />}
		>
			<>
				<ShippingProgressBar currentAmount={20} targetAmount={75} />
				<CartNotice />
				<div
					className={cn(
						'flex flex-col',
						isPending && 'opacity-40 bg-secondary',
					)}
				>
					{optimisticState.map(
						({
							name,
							color,
							image,
							price,
							quantity,
							size,
							skuId,
							productId,
							discount,
						}) => (
							<CartItem
								key={`${skuId} ${size}`}
								name={name}
								color={color}
								id={skuId}
								price={price}
								size={size}
								quantity={quantity}
								imageSrc={image}
								productId={productId}
								discountPrice={discount}
							/>
						),
					)}
				</div>
				<DiscountCode />
				<OrderSummary shippingCost={10} subTotal={total} />
			</>
		</Conditional>
	);
};
