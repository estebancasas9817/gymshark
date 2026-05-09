import { ProductListColor } from './product-list-color/product-list-color';

interface ProductListColorFilterProps {
	colorOptions: [string, string][];
}

export const ProductListColorFilter = ({
	colorOptions,
}: ProductListColorFilterProps) => {
	return (
		<>
			{colorOptions.map(([key, color]) => (
				<ProductListColor key={key} color={color} />
			))}
		</>
	);
};
