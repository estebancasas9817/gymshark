'use client';

import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CheckEmailProps {
	email: string;
	onResend: () => Promise<void>;
	resendCooldownSeconds?: number;
}

export function CheckEmail({
	email,
	onResend,
	resendCooldownSeconds = 30,
}: CheckEmailProps) {
	const [isSending, setIsSending] = useState(false);
	const [cooldown, setCooldown] = useState(0);

	useEffect(() => {
		if (cooldown === 0) return;

		const interval = setInterval(() => {
			setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
		}, 1000);

		return () => clearInterval(interval);
	}, [cooldown]);

	const handleResend = async () => {
		if (isSending || cooldown > 0) return;

		setIsSending(true);
		try {
			await onResend();
			setCooldown(resendCooldownSeconds);
		} finally {
			setIsSending(false);
		}
	};

	const isDisabled = isSending || cooldown > 0;

	return (
		<div className="mx-auto max-w-md rounded-2xl bg-white px-8 py-10 text-center">
			<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-600">
				<Mail className="h-9 w-9 text-emerald-600" strokeWidth={1.75} />
			</div>

			<h1 className="mb-4 text-xl font-bold tracking-wide text-gray-900">
				CHECK YOUR EMAIL
			</h1>

			<p className="mb-8 text-sm leading-6 text-gray-500">
				Almost done. Please check your email{' '}
				<span className="font-medium text-gray-700">{email}</span> for
				instructions on how to reset your password. If you&apos;ve received the
				email, you can close this window.
			</p>

			<button
				type="button"
				onClick={handleResend}
				disabled={isDisabled}
				className="text-sm font-semibold text-gray-900 underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:no-underline"
			>
				{isSending
					? 'Sending...'
					: cooldown > 0
						? `Resend email (${cooldown}s)`
						: 'Resend email'}
			</button>
		</div>
	);
}
