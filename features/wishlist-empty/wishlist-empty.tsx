import Link from 'next/link';

export function WishlistEmpty() {
	return (
		<div className="flex flex-col items-center justify-center px-6 py-12 text-center max-w-sm mx-auto">
			<div className="relative w-52 h-44 mb-8">
				<Sparkles />

				<div className="absolute top-8 left-10 w-28 h-32 bg-gray-200 rounded-sm rotate-[-8deg] shadow-sm flex items-center justify-center">
					<div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center shadow-inner">
						<BrokenHeart className="w-6 h-6 text-red-500 opacity-80" />
					</div>
				</div>

				<div className="absolute top-4 left-20 w-28 h-32 bg-gray-200 rounded-sm rotate-6 shadow-md flex items-center justify-center">
					<div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center shadow-inner">
						<BrokenHeart className="w-6 h-6 text-red-500" />
					</div>
				</div>

				<div className="absolute inset-0 flex items-center justify-center -z-10">
					<div className="w-36 h-36 rounded-full bg-gray-100" />
				</div>
			</div>

			<h2 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-3">
				Your wishlist is empty
			</h2>

			<p className="text-sm text-gray-600 leading-relaxed mb-10">
				Tap the heart next to anything you like the look of and we&apos;ll save
				it here. Then when you&apos;re ready, add it to your bag, check out, put
				it on, and then let&apos;s go gym.
			</p>

			<div className="flex flex-col gap-3 w-full">
				<Link
					href="/men"
					className="w-full bg-black text-white text-sm font-bold uppercase tracking-widest py-4 rounded-full text-center hover:bg-gray-900 active:scale-95 transition-all"
				>
					Shop Mens
				</Link>
				<Link
					href="/women"
					className="w-full bg-gray-100 text-gray-900 text-sm font-bold uppercase tracking-widest py-4 rounded-full text-center hover:bg-gray-200 active:scale-95 transition-all"
				>
					Shop Womens
				</Link>
			</div>
		</div>
	);
}

/* ── Broken heart SVG ── */
function BrokenHeart({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
			{/* crack line */}
			<polyline
				points="12,7 10.5,11 13,13 11,18"
				fill="none"
				stroke="white"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/* ── Decorative sparkles ── */
function Sparkles() {
	const positions = [
		{ top: '4%', left: '8%', size: 10 },
		{ top: '10%', right: '10%', size: 8 },
		{ top: '30%', right: '2%', size: 6 },
		{ bottom: '18%', left: '4%', size: 7 },
		{ bottom: '8%', right: '18%', size: 9 },
		{ top: '55%', left: '18%', size: 6 },
	];

	return (
		<>
			{positions.map((pos, i) => (
				<span
					key={i}
					className="absolute text-gray-400 select-none pointer-events-none"
					style={{ ...pos, fontSize: pos.size, lineHeight: 1 }}
					aria-hidden="true"
				>
					✦
				</span>
			))}
		</>
	);
}
