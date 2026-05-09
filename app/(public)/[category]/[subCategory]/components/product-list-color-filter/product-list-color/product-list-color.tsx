'use client';

import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { CheckIcon, Circle } from 'lucide-react';
import { useState } from 'react';

interface ProductListColorProps {
	color: string;
}

export const ProductListColor = ({ color }: ProductListColorProps) => {
	const [isChecked, setIschecked] = useState(false);
	const isWhiteColor = color === 'White';
	const isYellowColor = color === 'White';
	const checkIconColor = isWhiteColor || isYellowColor ? 'black' : 'white';

	const handleClick = () => {
		setIschecked(!isChecked);
	};

	return (
		<Stack
			className="px-10 mb-6 relative"
			justify="center"
			align="center"
			gap="xs"
		>
			<Circle
				color={isWhiteColor ? '#d4d4d4' : color}
				size={60}
				fill={color}
				strokeWidth={0.5}
				className="cursor-pointer"
				onClick={handleClick}
			/>
			<Conditional test={isChecked}>
				<CheckIcon
					className="absolute top-5 left-50% cursor-pointer"
					color={checkIconColor}
					onClick={handleClick}
				/>
			</Conditional>
			<label className="text-sm text-gray-700">{color}</label>
		</Stack>
	);
};
