'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Loader2, Mail } from 'lucide-react';
import { cn } from '@/utils/cn/cn';
import Image from 'next/image';
import Logo from '../../../public/logo.png';
import { resendTokenAction, verifyAccountAction } from './actions';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type VerifyStatus =
	| 'verifying'
	| 'success'
	| 'expired'
	| 'invalid'
	| 'no_token';

interface VerifyAccountProps {
	token?: string;
	email?: string;
}

const STATUS_CONFIG = {
	verifying: {
		icon: Loader2,
		iconClass: 'bg-gray-100 text-gray-400',
		spinning: true,
		title: (t: any) => t('status.verifying.title'),
		description: (t: any) => t('status.verifying.description'),
	},
	success: {
		icon: CheckCircle,
		iconClass: 'bg-green-50 text-green-500',
		spinning: false,
		title: (t: any) => t('status.success.title'),
		description: (t: any) => t('status.success.description'),
	},
	expired: {
		icon: Clock,
		iconClass: 'bg-orange-50 text-orange-400',
		spinning: false,
		title: (t: any) => t('status.expired.title'),
		description: (t: any) => t('status.expired.description'),
	},
	invalid: {
		icon: XCircle,
		iconClass: 'bg-red-50 text-red-500',
		spinning: false,
		title: (t: any) => t('status.invalid.title'),
		description: (t: any) => t('status.invalid.description'),
	},
	no_token: {
		icon: XCircle,
		iconClass: 'bg-red-50 text-red-500',
		spinning: false,
		title: (t: any) => t('status.no_token.title'),
		description: (t: any) => t('status.no_token.description'),
	},
} as const;

export const VerifyAccount = ({ token, email }: VerifyAccountProps) => {
	const t = useTranslations('VerifyAccount');
	const [status, setStatus] = useState<VerifyStatus>(
		token ? 'verifying' : 'no_token',
	);
	const [isResending, setIsResending] = useState(false);
	const [resendSuccess, setResendSuccess] = useState(false);

	useEffect(() => {
		if (!token || status === 'success') return;

		const verifyAccount = async () => {
			const { status } = await verifyAccountAction(email, token);
			setStatus(status);
		};
		verifyAccount();
	}, [token, email]);

	const handleResend = async () => {
		if (!email || isResending) return;
		setIsResending(true);
		const { status } = await resendTokenAction(email);
		setResendSuccess(status);
		setIsResending(false);
	};

	const {
		icon: Icon,
		iconClass,
		spinning,
		title: titleFn,
		description: descFn,
	} = STATUS_CONFIG[status];

	const title = titleFn(t);
	const description = descFn(t);

	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md flex flex-col items-center gap-6 shadow-sm">
				<div className="flex items-center gap-2">
					<Image
						src={Logo}
						alt={t('metadata.logoAlt')}
						width={200}
						height={200}
						fetchPriority="high"
						priority
					/>
				</div>

				<div
					className={cn(
						'flex items-center justify-center w-20 h-20 rounded-full',
						iconClass,
					)}
				>
					<Icon size={40} className={spinning ? 'animate-spin' : undefined} />
				</div>

				<div className="text-center flex flex-col gap-2">
					<h1 className="text-xl font-bold tracking-tight text-gray-900">
						{title}
					</h1>
					<p className="text-sm text-gray-500 leading-relaxed">{description}</p>

					{email && status !== 'success' && status !== 'no_token' && (
						<span className="inline-flex items-center justify-center gap-1.5 mt-1 mx-auto px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
							<Mail size={11} />
							{email}
						</span>
					)}
				</div>

				<div className="w-full flex flex-col items-center gap-3">
					{status === 'success' && (
						<button className="w-full h-11 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
							<Link href={'/sign-in'}>{t('actions.goToSignIn')}</Link>
						</button>
					)}

					{status === 'expired' &&
						(resendSuccess ? (
							<p className="flex items-center gap-2 text-sm text-green-700">
								<Mail size={14} />
								{t('actions.emailSent')}
							</p>
						) : (
							<button
								onClick={handleResend}
								disabled={isResending}
								className="w-full h-11 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 cursor-pointer"
							>
								{isResending ? (
									<>
										<Loader2 size={16} className="animate-spin" />
										{t('actions.sending')}
									</>
								) : (
									t('actions.resendEmail')
								)}
							</button>
						))}

					{(status === 'invalid' || status === 'no_token') && (
						<button className="w-full h-11 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
							<Link href={'/sign-in'}>{t('actions.backToSignIn')}</Link>
						</button>
					)}
				</div>
			</div>
		</main>
	);
};
