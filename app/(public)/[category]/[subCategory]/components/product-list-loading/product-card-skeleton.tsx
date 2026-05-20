import { Shimmer } from './shimer';

interface ProductCardSkeletonProps {
	tall?: boolean;
}

export const ProductCardSkeleton = ({
	tall = false,
}: ProductCardSkeletonProps) => (
	<div className="flex flex-col gap-2">
		<div className="relative">
			<Shimmer
				className={`w-full ${tall ? 'aspect-3/4' : 'aspect-3/4'} rounded-none`}
			/>
			{/* Heart icon placeholder */}
			<div className="absolute right-3 top-3">
				<Shimmer className="h-8 w-8 rounded-full" />
			</div>
		</div>
		<Shimmer className="h-3.5 w-4/5 rounded" />
		<Shimmer className="h-3 w-1/3 rounded" />
		<div className="flex items-center gap-2">
			<Shimmer className="h-3.5 w-10 rounded" />
			<Shimmer className="h-3 w-8 rounded" />
		</div>
	</div>
);
