import { ProductCardSkeleton } from './product-card-skeleton';

export const ProductGridSkeleton = () => {
	return (
		<>
			<div className="mb-30 grid grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
			</div>

			<div className="mb-10 grid grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
			</div>

			<div className="grid grid-cols-4 gap-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
			</div>
		</>
	);
};
