'use client';

import { useCart } from '@/app/context/cart-context';
import { CartNotice } from '@/components/ui/cart-notice';
import { DiscountCode } from '@/components/ui/discount-code';
import { OrderSummary } from '@/components/ui/order-summary';
import { ShippingProgressBar } from '@/components/ui/shipping-progress-bar';
import { CartItem } from '@/features/cart-item';
import { UIEvent } from 'react';

interface DrawerBodyProps {
	onScroll: (e: UIEvent<HTMLDivElement>) => void;
}

export const DrawerBody = ({ onScroll }: DrawerBodyProps) => {
	const { optimisticState, handleAddToCart } = useCart();

	return (
		<div
			className="flex-1 overflow-y-auto scroll-smooth px-8 pt-25 pb-4"
			onScroll={onScroll}
		>
			<ShippingProgressBar currentAmount={20} targetAmount={75} />
			<CartNotice />
			<div className="flex flex-col">
				{optimisticState.map(
					({ name, color, image, price, quantity, size, skuId, productId }) => (
						<CartItem
							key={skuId}
							name={name}
							color={color}
							id={skuId}
							price={price}
							size={size}
							quantity={quantity}
							imageSrc={image}
							productId={productId}
							onUpdateQuantity={handleAddToCart}
						/>
					),
				)}
			</div>
			<DiscountCode />
			<OrderSummary shippingCost={10} subTotal={30} />
		</div>
	);
};
