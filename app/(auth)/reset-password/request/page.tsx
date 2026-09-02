'use client';

import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Input } from '@/components/ui/input';
import { AuthForm } from '@/components/ui/auth-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChangeEvent, useActionState, useState } from 'react';
import { cn } from '@/utils/cn/cn';
import { LoginHeader } from '../../sign-in/components/login-header';
import {
	forgotPasswordAction,
	forgotPasswordFormAction,
} from '../../sign-in/actions';
import { Conditional } from '@/components/layout/conditional';
import { Text } from '@/components/ui/text';
import { CircleX } from 'lucide-react';
import { CheckEmail } from './components/check-email';

export default function Page() {
	const t = useTranslations('ResetPassword');
	const [state, formAction, isPending] = useActionState(
		forgotPasswordFormAction,
		{
			success: false,
			status: 'INITIAL',
		},
	);
	const [email, setEmail] = useState<string>('');

	let emailError: string | undefined = undefined;
	if (state.status === 'WRONG_INPUT') {
		emailError = state.errors.email?.[0];
	}
	const isFailedStatus = state.status === 'UNEXPECTED_ERROR';
	const isSuccessStatus = state.status === 'SUCCESS';

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleResend = async () => {
		await forgotPasswordAction(email);
	};

	return (
		<Conditional
			test={!isSuccessStatus}
			fallback={<CheckEmail email={email} onResend={handleResend} />}
		>
			<Container as="main" fullWidth className="relative h-screen">
				<Stack
					align="center"
					justify="center"
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120"
				>
					<LoginHeader title={t('title')} subTitle={t('description')} />
					<AuthForm action={formAction} className="mt-4">
						<Input
							name="email"
							type="email"
							placeholder={t('input_placeholder')}
							required
							error={emailError}
							onChange={handleOnChange}
						/>

						<Stack gap="sm">
							<Button
								radius="md"
								className={cn(
									'font-sans my-4',
									isPending && 'cursor-not-allowed',
								)}
								type="submit"
								disabled={isPending}
							>
								{isPending ? (
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary border-t-primary" />
								) : (
									<>{t('button_text')}</>
								)}
							</Button>
							<Button
								variant="inline"
								className="text-primary hover:text-none text-sm pt-0"
							>
								<Link href="/sign-in">{t('link_text')}</Link>
							</Button>
							<Conditional test={isFailedStatus}>
								<Text
									className={cn(
										'flex gap-2 items-center justify-center text-sm',
										'text-error',
									)}
								>
									<CircleX size={16} />
									Unexpected Error
								</Text>
							</Conditional>
						</Stack>
					</AuthForm>
				</Stack>
			</Container>
		</Conditional>
	);
}
