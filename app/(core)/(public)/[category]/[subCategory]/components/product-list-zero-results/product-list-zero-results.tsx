'use client';

import { ShoppingBag } from 'lucide-react';
import { useFilter } from '../../hooks/use-filter';

export const ProductListZeroResults = () => {
	const { handleClearAllFilters } = useFilter();

	return (
		<div className="flex flex-col items-center justify-center py-20 px-6 text-center">
			<ShoppingBag size={48} className="text-gray-300 mb-4" strokeWidth={1} />

			<h3 className="font-bold text-lg mb-2">No products found</h3>
			<p className="text-gray-500 text-sm mb-6 max-w-xs">
				We couldn&apos;t find any products matching your current filters. Try
				adjusting or clearing your filters.
			</p>

			<button
				className="underline text-sm font-semibold cursor-pointer"
				onClick={handleClearAllFilters}
			>
				Clear all filters
			</button>
		</div>
	);
};
