'use client';

import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Input } from '@/components/ui/input';
import { AuthForm } from '@/components/ui/auth-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useActionState } from 'react';
import { cn } from '@/utils/cn/cn';
import { LoginHeader } from '../../sign-in/components/login-header';
import { forgotPasswordAction } from '../../sign-in/actions';
import { Conditional } from '@/components/layout/conditional';
import { Text } from '@/components/ui/text';
import { CircleX } from 'lucide-react';

export default function Page() {
	const t = useTranslations('ResetPassword');
	const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
		errors: undefined,
		message: '',
		success: false,
	});
	const { errors, message, status } = state ?? {};
	const isFailedStatus = status === 'UNEXPECTED_ERROR';
	const emailError = errors?.email?.[0];

	return (
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

								{message}
							</Text>
						</Conditional>
					</Stack>
				</AuthForm>
			</Stack>
		</Container>
	);
}
