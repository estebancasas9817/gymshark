'use client';

import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';

type ToastVariant = 'success' | 'error';

interface Toast {
	id: number;
	message: string;
	variant: ToastVariant;
}

interface ToastContextValue {
	success: (message: string) => void;
	error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION = 3000; // ms visible
const EXIT_DURATION = 300; // ms for exit animation

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [exiting, setExiting] = useState<Set<number>>(new Set());
	const counter = useRef(0);

	const dismiss = useCallback((id: number) => {
		setExiting((prev) => new Set(prev).add(id));
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
			setExiting((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}, EXIT_DURATION);
	}, []);

	const add = useCallback(
		(message: string, variant: ToastVariant) => {
			const id = ++counter.current;
			setToasts((prev) => [...prev, { id, message, variant }]);
			setTimeout(() => dismiss(id), DURATION);
		},
		[dismiss],
	);

	const success = useCallback((msg: string) => add(msg, 'success'), [add]);
	const error = useCallback((msg: string) => add(msg, 'error'), [add]);

	return (
		<ToastContext.Provider value={{ success, error }}>
			{children}

			<div
				aria-live="polite"
				aria-atomic="false"
				className="fixed top-[7%] left-1/2 -translate-x-1/2 z-9999 flex flex-col items-center gap-2 w-max max-w-[90vw] pointer-events-none"
			>
				{toasts.map((toast) => (
					<ToastItem
						key={toast.id}
						toast={toast}
						isExiting={exiting.has(toast.id)}
						onDismiss={dismiss}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}

// ── Toast item ─────────────────────────────────────────────────────────────

function ToastItem({
	toast,
	isExiting,
	onDismiss,
}: {
	toast: Toast;
	isExiting: boolean;
	onDismiss: (id: number) => void;
}) {
	const base =
		'pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full shadow-lg text-white text-sm font-semibold transition-all duration-300';

	const variantClass = toast.variant === 'success' ? 'bg-black' : 'bg-red-600';

	const animationClass = isExiting
		? 'opacity-0 -translate-y-2 scale-95'
		: 'opacity-100 translate-y-0 scale-100';

	return (
		<div role="status" className={`${base} ${variantClass} ${animationClass}`}>
			{toast.variant === 'success' ? <CheckIcon /> : <XCircleIcon />}

			<span>{toast.message}</span>

			<button
				onClick={() => onDismiss(toast.id)}
				aria-label="Dismiss"
				className="ml-1 opacity-70 hover:opacity-100 transition-opacity shrink-0"
			>
				<CloseIcon />
			</button>
		</div>
	);
}

// ── Micro icons ────────────────────────────────────────────────────────────

function CheckIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
			<polyline
				points="4.5,8 7,10.5 11.5,5.5"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function XCircleIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
			<line
				x1="5.5"
				y1="5.5"
				x2="10.5"
				y2="10.5"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<line
				x1="10.5"
				y1="5.5"
				x2="5.5"
				y2="10.5"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			aria-hidden="true"
		>
			<line
				x1="2"
				y1="2"
				x2="10"
				y2="10"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<line
				x1="10"
				y1="2"
				x2="2"
				y2="10"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function useToast(): ToastContextValue {
	const ctx = useContext(ToastContext);
	if (!ctx) {
		throw new Error('useToast must be used inside <ToastProvider>');
	}
	return ctx;
}
