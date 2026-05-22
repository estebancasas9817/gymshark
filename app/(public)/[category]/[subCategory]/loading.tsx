import { Container } from '@/components/layout/container';
import {
	FilterSection,
	ProductCardSkeleton,
	Shimmer,
} from './components/product-list-loading';
import { ProductGridSkeleton } from './components/product-list-loading/product-grid-skeleton';

export default function Loading() {
	return (
		<>
			<style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

			<Container className="pb-16 pt-10">
				{/* ── Page Header ── */}
				<div className="mb-8">
					<Shimmer className="h-10 w-72 rounded" />
				</div>
				<Shimmer className="mb-4 h-3.5 w-24 rounded" />
				<div className="mb-2 flex flex-col gap-2">
					<Shimmer className="h-3.5 w-full max-w-lg rounded" />
					<Shimmer className="h-3.5 w-full max-w-md rounded" />
					<Shimmer className="h-3.5 w-48 rounded" />
				</div>

				{/* ── Hero Banner: 3 images (narrow | wide | narrow) ── */}
				<div className="mb-16 mt-6 flex h-90 gap-0.5">
					<Shimmer className="h-full flex-1" />
				</div>

				{/* ── Filter + Content Layout ── */}
				<div className="flex gap-8">
					{/* Sidebar */}
					<aside className="w-80 shrink-0 mt-2">
						{/* "FILTER & SORT" header row */}
						<div className="mb-1 flex items-center justify-between pb-4">
							<Shimmer className="h-3.5 w-28 rounded" />
							<Shimmer className="h-3.5 w-14 rounded" />
						</div>

						{/* Sort By section (expanded) */}
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

						{/* Collapsed filter sections */}
						<FilterSection width="w-10" />
						<FilterSection width="w-12" />
						<FilterSection width="w-12" />
						<FilterSection width="w-12" />
					</aside>

					{/* Main content */}
					<div className="min-w-0 flex-1">
						{/* Section header + nav arrows */}
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
