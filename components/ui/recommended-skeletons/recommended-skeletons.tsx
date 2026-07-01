import { Container } from '@/components/layout/container';

export function Recommendedkeletons() {
	return (
		<Container className="my-16">
			{/* Header */}
			<div className="flex items-center justify-between mb-5">
				<div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
				<div className="flex gap-2">
					<div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
					<div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
				</div>
			</div>

			{/* Cards grid */}
			<div className="flex gap-2">
				{Array.from({ length: 4 }).map((_, i) => (
					<SkeletonCard key={i} faded={i === 3} />
				))}
			</div>
		</Container>
	);
}

function SkeletonCard({ faded = false }: { faded?: boolean }) {
	return (
		<div className={`flex flex-col gap-2 w-full ${faded ? 'opacity-60' : ''}`}>
			{/* Image */}
			<div className="relative">
				<div className="bg-gray-200 animate-pulse h-90" />
				{/* Wishlist button */}
				<div className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-gray-200 animate-pulse" />
			</div>
			{/* Product name */}
			<div className="h-3.5 w-3/4 bg-gray-200 animate-pulse rounded" />
			{/* Colour */}
			<div className="h-3 w-2/5 bg-gray-200 animate-pulse rounded" />
			{/* Price(s) */}
			<div className="flex items-center gap-2">
				<div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
				{/* Sale price placeholder — same width, slightly lighter */}
				<div className="h-3.5 w-1/5 bg-gray-100 animate-pulse rounded" />
			</div>
		</div>
	);
}
