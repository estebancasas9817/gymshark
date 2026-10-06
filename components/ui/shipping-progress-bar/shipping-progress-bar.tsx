import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Text } from '../text';

interface ShippingProgressBarProps {
	currentAmount: number;
	targetAmount?: number;
}

export const ShippingProgressBar: React.FC<ShippingProgressBarProps> = ({
	currentAmount,
	targetAmount = 75,
}) => {
	const missingAmount = targetAmount - currentAmount;
	const isQualified = missingAmount <= 0;

	const percentage = Math.min(
		Math.max((currentAmount / targetAmount) * 100, 0),
		100,
	);

	return (
		<div className="w-full bg-white font-sans text-gray-700">
			<div className="flex items-center gap-2 text-sm md:text-[15px]">
				{isQualified ? (
					<>
						<CheckCircle2
							className="h-5 w-5 shrink-0 text-[#2e7d32]"
							fill="#2e7d32"
							stroke="#ffffff"
							strokeWidth={2.5}
						/>
						<Text as="span" className="font-medium text-sm text-gray-700">
							You&apos;ve qualified for Free Standard Shipping
						</Text>
					</>
				) : (
					<>
						<Text as="span" className="text-sm text-gray-700">
							You&apos;re{' '}
							<strong className="font-semibold">${missingAmount}</strong> away
							from Free Standard Shipping
						</Text>
					</>
				)}
			</div>

			<div className="mt-3 h-1.5 w-full rounded-full bg-[#EAEAEA]">
				<div
					className="h-full rounded-full bg-[#0091ea] transition-all duration-500 ease-out"
					style={{ width: `${percentage}%` }}
				/>
			</div>

			{!isQualified && (
				<div className="mt-1.5 flex justify-between text-xs text-[#767676]">
					<span>$0</span>
					<span>${targetAmount}</span>
				</div>
			)}
		</div>
	);
};
