import { Container } from '@/components/layout/container';
import { FilterSection, Shimmer } from './components/product-list-loading';
import { ProductGridSkeleton } from './components/product-list-loading/product-grid-skeleton';
import { ProductListHeaderSkeletons } from './components/product-list-header-skeletons';

export default function Loading() {
	return (
		<>
			<style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

			<Container className="pb-16 pt-10">
				<ProductListHeaderSkeletons />

				<div className="flex gap-8">
					<aside className="w-80 shrink-0 mt-2 hidden lg:block">
						<div className="mb-1 flex items-center justify-between pb-4">
							<Shimmer className="h-3.5 w-28 rounded" />
							<Shimmer className="h-3.5 w-14 rounded" />
						</div>

						<div className="border-t border-gray-200 py-5">
							<div className="mb-4 flex items-center justify-between">
								<Shimmer className="h-3.5 w-16 rounded" />
								<Shimmer className="h-3.5 w-3.5 rounded" />
							</div>
							<div className="flex flex-col gap-3.5">
								{['w-32', 'w-36', 'w-24'].map((w, i) => (
									<div key={i} className="flex items-center gap-2.5">
										<Shimmer className="h-4 w-4 rounded-full" />
										<Shimmer className={`h-3 ${w} rounded`} />
									</div>
								))}
							</div>
						</div>

						<FilterSection width="w-10" />
						<FilterSection width="w-12" />
						<FilterSection width="w-12" />
						<FilterSection width="w-12" />
					</aside>

					<div className="min-w-0 flex-1">
						<div className="mb-6 flex items-center justify-between">
							<Shimmer className="h-4 w-44 rounded" />
							<div className="flex gap-2">
								<Shimmer className="h-9 w-9 rounded-full" />
								<Shimmer className="h-9 w-9 rounded-full" />
							</div>
						</div>

						<ProductGridSkeleton />
					</div>
				</div>
			</Container>
		</>
	);
}
