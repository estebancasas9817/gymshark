'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { Conditional } from '@/components/layout/conditional';

const BG = '#f0ede7';

interface PlateProps {
	cx: number;
	cy: number;
	r: number;
	opacity?: number;
}

function Plate({ cx, cy, r, opacity = 1 }: PlateProps) {
	const grip = (angle: number) => {
		const a = (angle * Math.PI) / 180;
		return {
			x: cx + Math.cos(a) * r * 0.52,
			y: cy + Math.sin(a) * r * 0.52,
			angle,
		};
	};

	return (
		<g opacity={opacity}>
			<circle cx={cx} cy={cy} r={r + 4} fill="#e1ded8" opacity={0.5} />
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

function SuccessPlates() {
	return (
		<svg
			viewBox="0 0 1200 520"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full"
			aria-hidden="true"
			preserveAspectRatio="xMidYMax meet"
		>
			<Plate cx={380} cy={560} r={280} opacity={0.8} />
			<Plate cx={820} cy={560} r={280} opacity={0.8} />

			<Plate cx={470} cy={540} r={230} opacity={0.9} />
			<Plate cx={730} cy={540} r={230} opacity={0.9} />

			<Plate cx={600} cy={520} r={170} />
		</svg>
	);
}

export default function CheckoutSuccessPage() {
	const t = useTranslations('SuccessCheckout.checkoutSuccess');
	const searchParams = useSearchParams();
	const userId = useSession().data?.user?.id;
	const stripeSessionId = searchParams.get('session_id');

	return (
		<div
			className="fixed inset-0 z-9999 w-screen h-screen overflow-hidden flex flex-col select-none"
			style={{ backgroundColor: BG }}
		>
			<header className="success-logo relative z-10 flex justify-center pt-10">
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
						strokeWidth="3"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<p
					className="success-eyebrow font-black uppercase text-black leading-none"
					style={{
						fontSize: 'clamp(3.5rem,12vw,8.5rem)',
						letterSpacing: '-0.03em',
					}}
				>
					{t('thanks.title')}
				</p>

				<h1
					className="success-title font-semibold text-black mt-4"
					style={{
						fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
						letterSpacing: '0.04em',
					}}
				>
					{t('thanks.subtitle')}
				</h1>

				<p className="text-md success-sub text-neutral-500 mt-3 mb-8 max-w-md leading-relaxed">
					{t('thanks.description')}
				</p>

				<div className="success-actions flex flex-col sm:flex-row items-center gap-3">
					<Conditional test={!!userId}>
						<Link
							href="/account/orders"
							className="text-sm inline-flex items-center justify-center rounded-full bg-black text-white font-bold uppercase transition-transform hover:scale-[1.04] active:scale-[0.97] cursor-pointer"
							style={{
								letterSpacing: '0.15em',
								padding: '1rem 2.5rem',
							}}
						>
							{t('thanks.buttonOrders')}
						</Link>
					</Conditional>

					<Link
						href="/"
						className="text-sm inline-flex items-center justify-center rounded-full border border-black text-black font-bold uppercase transition-transform hover:scale-[1.04] active:scale-[0.97]"
						style={{
							letterSpacing: '0.15em',
							padding: '1rem 2.5rem',
						}}
					>
						{t('thanks.buttonContinue')}
					</Link>
				</div>

				{stripeSessionId && (
					<p
						className="mt-8 text-neutral-400 font-mono"
						style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}
					>
						REF: {stripeSessionId.substring(0, 24)}...
					</p>
				)}
			</main>

			<div className="success-plates pointer-events-none absolute bottom-0 left-0 w-full">
				<SuccessPlates />
			</div>
		</div>
	);
}
