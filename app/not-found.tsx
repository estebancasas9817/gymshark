import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const BG = '#f0ede7';

interface PlateProps {
	cx: number;
	cy: number;
	r: number;
	rotation?: number;
	opacity?: number;
	cracked?: boolean;
}

function Plate({
	cx,
	cy,
	r,
	rotation = 0,
	opacity = 1,
	cracked = false,
}: PlateProps) {
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
			{cracked && (
				<path
					d={`M${cx - r * 0.04} ${cy - r * 0.78} L${cx + r * 0.09} ${cy - r * 0.32} L${cx - r * 0.06} ${cy - r * 0.08} L${cx + r * 0.1} ${cy + r * 0.3} L${cx + r * 0.01} ${cy + r * 0.52} L${cx - r * 0.08} ${cy + r * 0.78}`}
					stroke="#9e9c97"
					strokeWidth={r * 0.025}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			)}
		</g>
	);
}

function WeightPlates() {
	return (
		<svg
			viewBox="0 0 1200 600"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full h-auto"
			aria-hidden="true"
			preserveAspectRatio="xMidYMax meet"
		>
			<Plate cx={110} cy={590} r={195} rotation={-22} opacity={0.5} />
			<Plate cx={1090} cy={595} r={180} rotation={16} opacity={0.5} />
			<Plate cx={320} cy={600} r={250} rotation={-10} opacity={0.78} />
			<Plate cx={880} cy={605} r={238} rotation={12} opacity={0.78} />
			<Plate cx={600} cy={585} r={285} rotation={-3} cracked />
		</svg>
	);
}

export default async function NotFound() {
	const t = await getTranslations('RootPage.error');

	return (
		<div
			className="fixed inset-0 z-9999 w-screen h-screen overflow-hidden flex flex-col select-none"
			style={{ backgroundColor: BG }}
		>
			<header className="not-found-logo absolute top-0 left-0 w-full z-20 flex justify-center pt-10 px-4">
				<Link href="/">
					<span className="font-black uppercase text-black tracking-wider text-2xl">
						{t('common.brand')}
					</span>
				</Link>
			</header>

			<main className="relative flex-1 flex flex-col items-center justify-center text-center px-4">
				<div className="z-10 -mt-20 md:-mt-28">
					<p
						className="not-found-number font-black text-black leading-none"
						style={{
							fontSize: 'clamp(6rem, 20vw, 14rem)',
							letterSpacing: '-0.03em',
						}}
					>
						{t('notFound.title')}
					</p>

					<h1
						className="not-found-title font-semibold text-black mt-1 uppercase"
						style={{
							fontSize: 'clamp(0.8rem, 2vw, 1rem)',
							letterSpacing: '0.05em',
						}}
					>
						{t('notFound.subtitle')}
					</h1>

					<p className="not-found-sub text-neutral-500 mt-4 mb-8 leading-relaxed mx-auto text-sm md:text-lg">
						{t('notFound.description')}
					</p>

					<Link
						href="/"
						className="not-found-btn inline-flex items-center justify-center rounded-full bg-black text-white font-bold uppercase transition-all hover:scale-[1.05] active:scale-[0.95] text-sm py-4 px-10 tracking-widest"
					>
						{t('notFound.buttonHome')}
					</Link>
				</div>

				<div className="pointer-events-none absolute bottom-0 left-0 w-full leading-0 translate-y-1">
					<WeightPlates />
				</div>
			</main>
		</div>
	);
}
