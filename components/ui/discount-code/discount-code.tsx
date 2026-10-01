import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '../button';
import { Text } from '../text';
import { Heading } from '../heading';

interface DiscountCodeProps {
	onApplyCode?: (code: string) => void;
	isLoading?: boolean;
}

export const DiscountCode: React.FC<DiscountCodeProps> = ({
	onApplyCode,
	isLoading = false,
}) => {
	const [code, setCode] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (code.trim()) {
			onApplyCode?.(code.trim());
		}
	};

	return (
		<div className="w-full bg-white py-4 font-sans">
			<Heading
				as="h5"
				className="mb-3 text-[14px] font-black uppercase tracking-wide text-[#111111]"
			>
				Discount Code
			</Heading>

			<form onSubmit={handleSubmit} className="flex gap-3">
				<div className="relative flex-1">
					<input
						type="text"
						placeholder="Enter code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="h-12.5 w-full rounded border border-[#111111] bg-white px-4 text-sm text-[#111111] placeholder-[#767676] outline-none transition-colors focus:border-black"
					/>
				</div>

				<Button type="submit" disabled={isLoading || !code.trim()} radius="md">
					{isLoading ? '...' : 'Apply'}
				</Button>
			</form>

			<div className="mt-2.5 flex items-center gap-1.5 text-[12px] text-[#767676]">
				<Info className="shrink-0 text-[#111111]" strokeWidth={2.5} size={13} />
				<Text as="span" className="text-[10px]">
					Gift Card codes can be applied at checkout.
				</Text>
			</div>
		</div>
	);
};
