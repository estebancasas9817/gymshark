import React from 'react';
import { Info } from 'lucide-react';
import { Stack } from '@/components/layout/stack';
import { Text } from '../text';

export const CartNotice = () => {
	return (
		<Stack
			direction="row"
			align="start"
			className="gap-3 rounded bg-[#F2F2F2] px-2 py-3 text-sm text-[#111111] mt-10 mb-4"
		>
			<Info className="shrink-0 mt-1" size={16} strokeWidth={2.5} />

			<Text as="p" className="leading-relaxed text-sm">
				<strong className="font-bold">Your items aren’t reserved</strong>,
				checkout quickly to make sure you don’t miss out.
			</Text>
		</Stack>
	);
};
