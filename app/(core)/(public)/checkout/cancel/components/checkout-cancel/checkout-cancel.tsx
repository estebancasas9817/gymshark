'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const BG = '#f0ede7';

interface PlateProps {
	cx: number;
	cy: number;
	r: number;
	rotation?: number;
	opacity?: number;
}

function Plate({ cx, cy, r, rotation = 0, opacity = 1 }: PlateProps) {
	const grip = (angle: number) => {
		const a = (angle * Math.PI) / 180;
		return {
			x: cx + Math.cos(a) * r * 0.52,
			y: cy + Math.sin(a) * r * 0.52,
			angle,
		};
	};

	return (
		<g transform={`rotate(${rotation},${cx},${cy})`} opacity={opacity}>
			<circle cx={cx} cy={cy} r={r + 4} fill="#e1ded8" opacity={0.3} />
			<circle cx={cx} cy={cy} r={r} fill="#b6b4ae" />
			<circle cx={cx} cy={cy} r={r * 0.93} fill="#cccac4" />
			<circle cx={cx} cy={cy} r={r * 0.84} fill="#bfbdb7" />
			<circle cx={cx} cy={cy} r={r * 0.78} fill="#cccac4" />
			<circle cx={cx} cy={cy} r={r * 0.265} fill="#b6b4ae" />
			<circle cx={cx} cy={cy} r={r * 0.19} fill="#cccac4" />
			<circle cx={cx} cy={cy} r={r * 0.085} fill={BG} />
			{[45, 135, 225, 315].map((a) => {
				const g = grip(a);
				return (
					<ellipse
						key={a}
						cx={g.x}
						cy={g.y}
						rx={r * 0.065}
						ry={r * 0.11}
						transform={`rotate(${g.angle},${g.x},${g.y})`}
						fill={BG}
					/>
				);
			})}
		</g>
	);
}

function CancelPlates() {
	return (
		<svg
			viewBox="0 0 1200 520"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full"
			aria-hidden="true"
			preserveAspectRatio="xMidYMax meet"
		>
			<Plate cx={120} cy={580} r={260} rotation={-35} opacity={0.6} />
			<Plate cx={240} cy={595} r={240} rotation={-15} opacity={0.8} />

			<Plate cx={1080} cy={580} r={260} rotation={35} opacity={0.6} />
			<Plate cx={960} cy={595} r={240} rotation={15} opacity={0.8} />

			<line
				x1={200}
				y1={590}
				x2={1000}
				y2={590}
				stroke="#b6b4ae"
				strokeWidth="8"
				opacity={0.4}
			/>
		</svg>
	);
}

export const CheckoutCancel = () => {
	const t = useTranslations('CancelCheckout.checkoutCancel');

	return (
		<div
			className="fixed inset-0 z-9999 w-screen h-screen overflow-hidden flex flex-col select-none"
			style={{ backgroundColor: BG }}
		>
			<header className="cancel-logo relative z-10 flex justify-center pt-10">
				<span
					className="font-black uppercase text-black"
					style={{ fontSize: '1.25rem', letterSpacing: '0.4em' }}
				>
					{t('common.brand')}
				</span>
			</header>

			<main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4 pb-48 md:pb-64">
				<div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full border-2 border-black">
					<svg
						className="w-8 h-8 text-black"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>

				<p
					className="cancel-eyebrow font-black uppercase text-black leading-none"
					style={{
						fontSize: 'clamp(3.5rem,12vw,8.5rem)',
						letterSpacing: '-0.03em',
					}}
				>
					{t('status.title')}
				</p>

				<h1
					className="cancel-title font-semibold text-black mt-4"
					style={{
						fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
						letterSpacing: '0.04em',
					}}
				>
					{t('status.subtitle')}
				</h1>

				<p className="text-md cancel-sub text-neutral-500 mt-3 mb-8 max-w-sm leading-relaxed">
					{t('status.description')}
				</p>

				<div className="cancel-actions flex flex-col sm:flex-row items-center gap-3">
					<Link
						href="/"
						className="text-sm inline-flex items-center justify-center rounded-full border border-black text-black font-bold uppercase transition-transform hover:scale-[1.04] active:scale-[0.97]"
						style={{
							letterSpacing: '0.15em',
							padding: '1rem 2.5rem',
						}}
					>
						{t('status.buttonHome')}
					</Link>
				</div>
			</main>

			<div className="cancel-plates pointer-events-none absolute bottom-0 left-0 w-full">
				<CancelPlates />
			</div>
		</div>
	);
};
