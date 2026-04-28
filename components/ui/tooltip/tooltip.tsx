'use client';

import {
	useState,
	useRef,
	useEffect,
	useCallback,
	type ReactNode,
	type CSSProperties,
} from 'react';
import styles from './tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
	content: ReactNode;
	position?: TooltipPosition;
	delay?: number;
	maxWidth?: number;
	disabled?: boolean;
	className?: string;
	children: ReactNode;
}

export function Tooltip({
	content,
	position = 'top',
	delay = 0,
	maxWidth = 220,
	disabled = false,
	className,
	children,
}: TooltipProps) {
	const [visible, setVisible] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const show = useCallback(() => {
		if (disabled) return;
		timerRef.current = setTimeout(() => setVisible(true), delay);
	}, [disabled, delay]);

	const hide = useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setVisible(false);
	}, []);

	useEffect(
		() => () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		},
		[],
	);

	const tooltipStyle: CSSProperties = { maxWidth };

	return (
		<span
			className={`${styles.wrapper} ${className ?? ''}`}
			onMouseEnter={show}
			onMouseLeave={hide}
			onFocusCapture={show}
			onBlurCapture={hide}
		>
			{children}

			{visible && (
				<span
					role="tooltip"
					className={`${styles.tooltip} ${styles[position]}`}
					style={tooltipStyle}
				>
					{content}
					<span className={styles.arrow} aria-hidden="true" />
				</span>
			)}
		</span>
	);
}
