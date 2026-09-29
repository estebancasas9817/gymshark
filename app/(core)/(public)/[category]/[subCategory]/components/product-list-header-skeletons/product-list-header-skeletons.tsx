import { Shimmer } from '../product-list-loading';

export const ProductListHeaderSkeletons = () => {
	return (
		<div className="w-full max-w-max animate-pulse">
			<main className="space-y-4 sm:space-y-6">
				<div className="mb-8">
					<Shimmer className="h-10 w-72 rounded" />
				</div>
				<Shimmer className="mb-4 h-3.5 w-24 rounded" />
				<div className="mb-2 flex flex-col gap-2">
					<Shimmer className="h-3.5 w-full max-w-lg rounded" />
					<Shimmer className="h-3.5 w-full max-w-md rounded" />
					<Shimmer className="h-3.5 w-48 rounded" />
				</div>

				<div className="mb-16 mt-6 flex h-120 md:h-140 gap-0.5">
					<Shimmer className="h-full flex-1" />
				</div>

				<div className="w-full pt-4">
					<div className="w-full aspect-4/3 sm:aspect-video lg:aspect-21/9 bg-gray-200 rounded-lg sm:rounded-xl" />
				</div>
			</main>
		</div>
	);
};
