'use client';

import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { cn } from '@/utils/cn/cn';
import { useState } from 'react';
import styles from './payment-carousel.module.css';
import { Conditional } from '@/components/layout/conditional';

const slides = [
	{
		id: 1,
		title: 'Unlock Access Exclusive Rewards & Benefits',
		sub: 'Purchasing this product earns 480XP',
	},
	{
		id: 2,
		title: 'Standard Delivery',
		subTitle: '(4-7 Working Days)',
		sub: 'Free Standard Delivery for orders over $75',
	},
	{
		id: 3,
		title: 'Express Delivery',
		subTitle: '(3 Working Days)',
		sub: 'Express Delivery Available',
	},
];

export const PaymentCarousel = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className={styles['carousel-container']}>
			<div className={styles['carousel-window']}>
				<Stack
					direction="row"
					className={cn(styles['carousel-track'], 'gap-0')}
					as="ul"
				>
					{slides.map(({ id, title, sub, subTitle }) => (
						<li
							key={id}
							className={cn(styles['carousel-slide'], styles['slide-content'])}
							style={{ transform: `translateX(-${activeIndex * 100}%)` }}
						>
							<Text as="p" variant="primary" className="text-xs font-bold">
								{title}
								<Conditional test={!!subTitle}>
									<Text
										as="span"
										className="text-xs font-normal"
										variant="tertiary"
									>
										{' '}
										{subTitle}
									</Text>
								</Conditional>
							</Text>
							<Text as="span" variant="tertiary" className="text-xs">
								{sub}
							</Text>
						</li>
					))}
				</Stack>
			</div>

			<div
				role="tablist"
				aria-label="Benefits carousel"
				className={styles['dots-container']}
			>
				{slides.map((_, i) => (
					<button
						key={i}
						type="button"
						role="tab"
						aria-selected={activeIndex === i}
						className={cn(
							'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer',
							activeIndex === i ? 'bg-black' : 'bg-gray-300',
						)}
						onClick={() => setActiveIndex(i)}
						aria-label={`Go to slide ${i + 1} of ${slides.length}`}
					/>
				))}
			</div>
		</div>
	);
};
