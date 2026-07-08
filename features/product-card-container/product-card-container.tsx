import { Stack } from '@/components/layout/stack';
import { ProductCard } from '../product-card/product-card';
import { cn } from '@/utils/cn/cn';
import { Product, Sku } from '@/types/product';

type ProductCard = Product & {
	sku: Sku;
	href: string;
};
interface ProductCardContainer {
	stackClassNames?: string;
	products?: ProductCard[];
	shouldUpdateImgOnHover?: boolean;
}
export const ProductCardContainer = ({
	stackClassNames,
	products,
	shouldUpdateImgOnHover = false,
}: ProductCardContainer) => {
	return (
		<Stack direction="row" className={cn('gap-1', stackClassNames)}>
			{products?.map(({ id, name, sku, basePrice, href, discount }) => (
				<ProductCard
					key={id}
					name={name}
					price={basePrice}
					color={sku.color}
					desc={name}
					href={href}
					imageSrc={sku.images}
					discount={discount}
					variant={sku}
					shouldUpdateImgOnHover={shouldUpdateImgOnHover}
				/>
			))}
		</Stack>
	);
};
