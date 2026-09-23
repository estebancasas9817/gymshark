import { Stack } from '@/components/layout/stack';
import React from 'react';

/**
 * Loading Skeleton component for the Orders page.
 * Replicates the layout of image_0.png, image_1.png, and image_2.png
 * across desktop, tablet, and mobile breakpoints.
 */
export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-12 md:px-12 md:py-16">
			{/* 1. "Back to account" link (top-left) */}
			<div className="flex items-center gap-1.5 mb-10 text-gray-700">
				{/* Placeholder arrow (SVG-like block) */}
				<div className="h-4 w-2 bg-gray-200 rounded animate-pulse" />
				{/* Placeholder text line */}
				<div className="h-4 w-32 bg-gray-200 rounded-sm animate-pulse" />
			</div>

			{/* 2. Page Title: "ORDERS" */}
			<div className="mb-10 h-10 w-48 bg-gray-200 rounded animate-pulse md:h-12 md:w-56" />

			{/* 3. Main Order Card (mirrors image layouts) */}
			<Stack direction="column">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="border border-gray-200 rounded-lg p-6  shadow-sm transition-all duration-300 bg-secondary"
					>
						{/* DESKTOP-SPECIFIC Layout (image_0.png) - visible only on md+ screens */}
						<div className="hidden md:flex md:items-start md:justify-between md:gap-8">
							{/* Left Column (Desktop) */}
							<div className="space-y-4 grow">
								{/* Title Line: ORDER #AGWVUW2E */}
								<div className="h-5 w-72 bg-gray-200 rounded animate-pulse" />

								{/* Date Line: Ordered on August 19, 2026 */}
								<div className="h-4 w-60 bg-gray-200 rounded animate-pulse" />

								{/* STATUS Section (with bar) */}
								<div className="space-y-2.5 pt-1.5">
									<div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
									{/* Status Bar Container */}
									<div className="w-full h-1.5 bg-gray-100 rounded-full flex items-center">
										{/* Blue-like bar fragment */}
										<div className="h-1.5 w-[30%] bg-blue-100 rounded-full" />
									</div>
									<div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
								</div>
							</div>

							{/* Right Column (Desktop): Images and Button */}
							<div className="flex items-start gap-4">
								{/* 2 images */}
								<div className="flex items-center gap-1.5">
									<div className="h-14 w-14 bg-gray-200 rounded-sm animate-pulse" />
									<div className="h-14 w-14 bg-gray-200 rounded-sm animate-pulse" />
								</div>
								{/* View Order button */}
								<div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
							</div>
						</div>

						<div className="md:hidden space-y-4">
							<div className="space-y-3">
								<div className="h-5 w-[80%] bg-gray-200 rounded animate-pulse" />
								<div className="h-4 w-[60%] bg-gray-200 rounded animate-pulse" />

								<div className="space-y-2 pt-1">
									<div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
									<div className="w-full h-1 bg-gray-100 rounded-full flex items-center">
										<div className="h-1 w-[30%] bg-blue-100 rounded-full" />
									</div>
									<div className="h-4 w-[50%] bg-gray-200 rounded animate-pulse" />
								</div>
							</div>

							<div className="hidden sm:flex sm:items-center sm:justify-end sm:gap-4 sm:pt-2">
								<div className="flex items-center gap-1.5">
									<div className="h-14 w-14 bg-gray-200 rounded-sm animate-pulse" />
									<div className="h-14 w-14 bg-gray-200 rounded-sm animate-pulse" />
								</div>
								<div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
							</div>

							<div className="space-y-4 pt-1 sm:hidden">
								{/* 2 images */}
								<div className="flex items-center gap-1.5">
									<div className="h-14 w-14 bg-gray-200 rounded-sm animate-pulse" />
									<div className="h-14 w-14 bg-gray-200 rounded-sm animate-pulse" />
								</div>
								{/* View Order button */}
								<div className="h-11 w-40 bg-gray-200 rounded-full animate-pulse" />
							</div>
						</div>
					</div>
				))}
			</Stack>
		</div>
	);
}
