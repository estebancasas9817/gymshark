'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './announcement-bar.module.css';
import { cn } from '@/utils/cn/cn';
import { Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

const MESSAGES = ['DISSCOUNT', 'FREE_SHIPPING', 'ARRIVALS'];

const SLIDE_DURATION = 380;
const DISPLAY_DURATION = 3000;

type Phase = 'idle' | 'exit' | 'enter';

export function AnnouncementBar() {
	const [index, setIndex] = useState(0);
	const [phase, setPhase] = useState<Phase>('idle');
	const [paused, setPaused] = useState(false);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const t = useTranslations('AnnouncementBar');

	const startCycle = () => {
		timerRef.current = setInterval(() => {
			// 1. Slide current message UP (exit)
			setPhase('exit');

			setTimeout(() => {
				// 2. Swap content + start slide-in from below (enter)
				setIndex((prev) => (prev + 1) % MESSAGES.length);
				setPhase('enter');

				setTimeout(() => {
					// 3. Animation done — reset to idle
					setPhase('idle');
				}, SLIDE_DURATION);
			}, SLIDE_DURATION);
		}, DISPLAY_DURATION);
	};

	useEffect(() => {
		if (!paused) startCycle();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [paused]);

	const phaseClass =
		phase === 'exit' ? 'ab-exit' : phase === 'enter' ? 'ab-enter' : '';

	return (
		<div
			role="region"
			aria-label="Announcement bar"
			className="relative flex h-10 w-full items-center overflow-hidden bg-black px-10 py-6"
		>
			<p
				aria-live="polite"
				className={cn(
					'absolute inset-x-0 text-center text-[13px] font-medium tracking-wide text-white',
					styles[phaseClass],
				)}
			>
				{t(MESSAGES[index])}
			</p>

			<button
				onClick={() => setPaused((p) => !p)}
				aria-label={paused ? 'Play announcements' : 'Pause announcements'}
				className="absolute right-6 md:right-10 flex h-6 w-6 items-center justify-center text-secondary cursor-pointer"
			>
				{paused ? (
					<Play size={14} fill="white" />
				) : (
					<Pause size={14} fill="white" />
				)}
			</button>
		</div>
	);
}
