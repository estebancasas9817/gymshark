export function EmptyOrders() {
	return (
		<div className="flex flex-col items-center justify-center mb-4">
			<svg
				width="100%"
				viewBox="0 0 680 470"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				className="max-w-sm"
				aria-labelledby="empty-orders-title empty-orders-desc"
			>
				<title id="empty-orders-title" className="text-lg bg-amber-200">
					No orders yet
				</title>
				<desc id="empty-orders-desc">
					When you place your first order, it will show up here.
				</desc>

				<rect
					x="240"
					y="150"
					width="200"
					height="170"
					rx="6"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
				/>

				{/* Handles */}
				<path
					d="M275 150 Q275 110 305 110 Q340 110 340 130"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				<path
					d="M405 150 Q405 110 375 110 Q340 110 340 130"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>

				{/* Gymshark-style shark fin */}
				<path
					d="M322 235 L340 200 L358 235 L349 228 L340 240 L331 228 Z"
					fill="none"
					stroke="#9CA3AF"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>

				{/* Divider dashed line */}
				<line
					x1="240"
					y1="185"
					x2="440"
					y2="185"
					stroke="#E5E7EB"
					strokeWidth="1"
					strokeDasharray="6 4"
				/>

				{/* Ambient dots */}
				<circle cx="200" cy="200" r="4" fill="#D1D5DB" />
				<circle cx="185" cy="240" r="2.5" fill="#E5E7EB" />
				<circle cx="480" cy="195" r="4" fill="#D1D5DB" />
				<circle cx="495" cy="235" r="2.5" fill="#E5E7EB" />
				<circle cx="210" cy="280" r="2" fill="#E5E7EB" />
				<circle cx="472" cy="280" r="2" fill="#E5E7EB" />

				<text
					x="340"
					y="392"
					textAnchor="middle"
					fontSize="26"
					fontWeight="500"
					fill="currentColor"
				>
					No orders yet
				</text>

				<text x="340" y="456" textAnchor="middle" fontSize="24" fill="#44444">
					When you place your first order, it will show up here.
				</text>
			</svg>
		</div>
	);
}
