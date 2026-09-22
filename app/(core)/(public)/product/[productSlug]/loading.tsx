'use client';

const Pulse = ({ className }: { className?: string }) => (
	<div className={`animate-pulse bg-gray-200 rounded ${className ?? ''}`} />
);

// Gallery skeleton — mirrors the 2-col grid + full-width 3rd image
const GallerySkeleton = () => (
	<div className="basis-1/2 relative h-auto md:h-260">
		{/* Mobile: single tall image */}
		<div className="block md:hidden w-full aspect-3/4">
			<Pulse className="w-full h-full rounded-none" />
		</div>

		{/* Tablet & Desktop: grid layout */}
		<div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-1">
			{/* Image 0 */}
			<Pulse className="aspect-2/3 rounded-none" />
			{/* Image 1 */}
			<Pulse className="aspect-2/3 rounded-none" />
			{/* Image 2 — full width (col-span-2) */}
			<Pulse className="col-span-2 aspect-3/5 rounded-none" />
		</div>
	</div>
);

// Right panel skeleton — mirrors the product info column
const ProductInfoSkeleton = () => (
	<div className="px-6 md:px-0 md:mx-12 lg:mx-12 xl:mx-37.5 md:max-w-80 lg:max-w-110 w-full">
		{/* Title */}
		<Pulse className="h-8 w-3/4 mt-12 md:mt-0 mb-2" />
		{/* Subtitle "Regular" */}
		<Pulse className="h-4 w-16 mb-2" />
		{/* Price */}
		<div className="flex gap-2 mb-6">
			<Pulse className="h-5 w-12" />
		</div>

		{/* Action pills (wishlist + share) */}
		<div className="flex gap-3 mt-12 mb-12">
			<Pulse className="h-9 w-24 rounded-full" />
			<Pulse className="h-9 w-9 rounded-full" />
			<Pulse className="h-9 w-9 rounded-full" />
		</div>

		{/* Color thumbnails */}
		<div className="flex gap-4 mb-1">
			{[0, 1, 2, 3].map((i) => (
				<Pulse key={i} className="w-14 h-18 rounded" />
			))}
		</div>
		{/* Color label */}
		<Pulse className="h-4 w-12 mb-6" />

		{/* "Select a size" label + size guide */}
		<div className="flex justify-between mt-12 mb-3">
			<Pulse className="h-4 w-24" />
			<Pulse className="h-4 w-20" />
		</div>

		{/* Size buttons */}
		<div className="flex gap-2 mb-6">
			{['S', 'M', 'L', 'XL'].map((s) => (
				<Pulse key={s} className="h-12 w-16 rounded" />
			))}
		</div>

		{/* "Customers say it fits" */}
		<Pulse className="h-4 w-48 mt-4 mb-6" />

		{/* ADD TO BAG button */}
		<Pulse className="h-14 w-full mt-16 rounded-full mb-12" />

		{/* Payment suggestions */}
		<Pulse className="h-5 w-56 mx-auto mb-2" />
		<div className="flex justify-center gap-3 mb-6">
			<Pulse className="h-5 w-8 rounded" />
			<Pulse className="h-5 w-8 rounded" />
		</div>

		{/* Payment carousel card */}
		<Pulse className="h-20 w-full rounded-xl mb-6" />
		{/* You might like */}
		<Pulse className="h-40 w-full rounded-xl mb-6" />
	</div>
);

export default function Loading() {
	return (
		<div className="pb-25">
			{/* Main PDP layout */}
			<div className="flex flex-col md:flex-row gap-0">
				<GallerySkeleton />
				<ProductInfoSkeleton />
			</div>

			{/* YOU MIGHT LIKE section */}
			<div className="mt-30 px-4 lg:px-10 border-t border-gray-200 pt-8">
				<div className="flex justify-between items-center mb-6">
					<div className="animate-pulse bg-gray-200 rounded h-6 w-40" />
					<div className="animate-pulse bg-gray-200 rounded h-4 w-24" />
				</div>
				<div className="flex gap-3 overflow-hidden">
					{[0, 1, 2, 3].map((i) => (
						<div key={i} className="flex-none w-[75%] md:w-[45%] lg:w-[23%]">
							<Pulse className="aspect-3/4 rounded mb-2" />
							<Pulse className="h-4 w-3/4 mb-1" />
							<Pulse className="h-3 w-16 mb-1" />
							<Pulse className="h-4 w-12" />
						</div>
					))}
				</div>
			</div>

			{/* WE RECOMMEND section */}
			<div className="mt-12 px-4 lg:px-10 pt-8">
				<div className="animate-pulse bg-gray-200 rounded h-6 w-40 mb-6" />
				<div className="flex gap-3 overflow-hidden">
					{[0, 1, 2, 3].map((i) => (
						<div key={i} className="flex-none w-[75%] md:w-[45%] lg:w-[23%]">
							<Pulse className="aspect-3/4 rounded mb-2" />
							<Pulse className="h-4 w-3/4 mb-1" />
							<Pulse className="h-3 w-16 mb-1" />
							<Pulse className="h-4 w-12" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
