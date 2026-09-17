'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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

// Plates scattered/fallen — visually distinct from the 404 crack pattern
function ErrorPlates() {
	return (
		<svg
			viewBox="0 0 1200 520"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full"
			aria-hidden="true"
			preserveAspectRatio="xMidYMax meet"
		>
			{/* Far rear – barely visible */}
			<Plate cx={0} cy={540} r={160} rotation={-45} opacity={0.35} />
			<Plate cx={1200} cy={545} r={150} rotation={42} opacity={0.35} />

			{/* Rear scattered */}
			<Plate cx={180} cy={600} r={210} rotation={-32} opacity={0.52} />
			<Plate cx={1020} cy={610} r={195} rotation={28} opacity={0.52} />

			{/* Mid – rolling outward */}
			<Plate cx={400} cy={580} r={255} rotation={-18} opacity={0.8} />
			<Plate cx={800} cy={585} r={242} rotation={22} opacity={0.8} />

			{/* Front center – upright but slightly tilted */}
			<Plate cx={600} cy={560} r={280} rotation={6} />
		</svg>
	);
}

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	const t = useTranslations('RootPage.error');

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div
			className="relative min-h-screen overflow-hidden flex flex-col select-none"
			style={{ backgroundColor: BG }}
		>
			<header className="err-logo relative z-10 flex justify-center pt-10">
				<span
					className="font-black uppercase text-black"
					style={{ fontSize: '1.25rem', letterSpacing: '0.4em' }}
				>
					{t('common.brand')}
				</span>
			</header>

			<main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4 pb-48 md:pb-64">
				<p
					className="err-eyebrow font-black uppercase text-black leading-none"
					style={{
						fontSize: 'clamp(4.5rem,15vw,11rem)',
						letterSpacing: '-0.03em',
					}}
				>
					{t('oops.title')}
				</p>

				<h1
					className="err-title font-semibold text-black mt-1"
					style={{
						fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
						letterSpacing: '0.04em',
					}}
				>
					{t('oops.subtitle')}
				</h1>

				<p className="text-sm md:text-lg err-sub text-neutral-500 mt-3 mb-8 leading-relaxed">
					{t('oops.description')}
				</p>

				<div className="err-actions flex flex-col sm:flex-row items-center gap-3">
					<button
						onClick={reset}
						className="text-sm  inline-flex items-center justify-center rounded-full bg-black text-white font-bold uppercase transition-transform hover:scale-[1.04] active:scale-[0.97] cursor-pointer"
						style={{
							letterSpacing: '0.15em',
							padding: '1rem 2.5rem',
						}}
					>
						{t('oops.buttonTryAgain')}
					</button>

					<Link
						href="/"
						className="text-sm inline-flex items-center justify-center rounded-full border border-black text-black font-bold uppercase transition-transform hover:scale-[1.04] active:scale-[0.97]"
						style={{
							letterSpacing: '0.15em',
							padding: '1rem 2.5rem',
						}}
					>
						{t('oops.buttonHome')}
					</Link>
				</div>

				{error?.digest && (
					<p
						className="mt-6 text-neutral-300 font-mono"
						style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}
						aria-hidden="true"
					>
						{error.digest}
					</p>
				)}
			</main>

			<div className="err-plates pointer-events-none absolute bottom-0 left-0 w-full">
				<ErrorPlates />
			</div>
		</div>
	);
}
