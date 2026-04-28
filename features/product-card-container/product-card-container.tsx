import { Stack } from '@/components/layout/stack';
import { ProductCard } from '../product-card/product-card';
import { cn } from '@/utils/cn/cn';

interface ProductCardContainer {
	stackClassNames?: string;
}
export const ProductCardContainer = ({
	stackClassNames,
}: ProductCardContainer) => {
	return (
		<Stack direction="row" className={cn('gap-1', stackClassNames)}>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg',
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
						{ inStock: true, size: 'L', stock: 10 },
					],
				}}
				discount={10}
				shouldUpdateImgOnHover
			/>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
					],
				}}
				discount={10}
			/>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
					],
				}}
				discount={10}
			/>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
					],
				}}
				discount={10}
			/>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
					],
				}}
				discount={10}
			/>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
					],
				}}
				discount={10}
			/>
			<ProductCard
				name="Gymshark Minimal Sports Bra - White"
				color="White"
				price={'30'}
				href=""
				desc="ddddd"
				imageSrc={[
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774720986/photo-1762331652347-b8f1665135d0_xastcv.jpg',
				]}
				variant={{
					color: '',
					id: '',
					images: [''],
					sizes: [
						{ inStock: true, size: 'XS', stock: 10 },
						{ inStock: true, size: 'S', stock: 10 },
						{ inStock: true, size: 'M', stock: 10 },
					],
				}}
				discount={10}
			/>
		</Stack>
	);
};
