import { Stack } from '@/components/layout/stack';
import { ProductCard } from '../product-card/product-card';
import { cn } from '@/utils/cn/cn';
import { Product, Sku } from '@/types/product';

type ProductCard = Product & {
	skus: Sku;
	href: string;
};
interface ProductCardContainer {
	stackClassNames?: string;
	products?: ProductCard[];
}
export const ProductCardContainer = ({
	stackClassNames,
	products,
}: ProductCardContainer) => {
	return (
		<Stack direction="row" className={cn('gap-1', stackClassNames)}>
			{products?.map(({ id, name, skus, basePrice, href, discount }) => (
				<ProductCard
					key={id}
					name={name}
					price={basePrice}
					color={skus.color}
					desc={name}
					href={href}
					imageSrc={skus.images}
					discount={discount}
					variant={skus}
				/>
			))}
		</Stack>
	);
};
