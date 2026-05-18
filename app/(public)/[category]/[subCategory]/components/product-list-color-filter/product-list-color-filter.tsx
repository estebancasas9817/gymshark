'use client';

import { useState } from 'react';
import { ProductListColor } from './product-list-color/product-list-color';
import { useSearchParams } from 'next/navigation';
import { QUERY_PARAMS } from '../../hooks/constants';

interface ProductListColorFilterProps {
	colorOptions: [string, string][];
}

export const ProductListColorFilter = ({
	colorOptions,
}: ProductListColorFilterProps) => {
	const colorParam = useSearchParams().get(QUERY_PARAMS.color);
	const [colorOption, setColorOption] = useState<string | null>(colorParam);

	return (
		<>
			{colorOptions.map(([key, color]) => (
				<ProductListColor
					key={key}
					color={color}
					colorOption={colorOption}
					setColorOption={setColorOption}
				/>
			))}
		</>
	);
};
