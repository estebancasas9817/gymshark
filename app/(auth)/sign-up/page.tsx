'use client';

import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Input } from '@/components/ui/input';
import { AuthForm } from '@/components/ui/auth-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Link from 'next/link';
import { LoginHeader } from '../sign-in/components/login-header';
import { useActionState } from 'react';
import { SignUpAction } from './actions';
import { cn } from '@/utils/cn/cn';
import { BadgeCheck, CircleX } from 'lucide-react';
import { Conditional } from '@/components/layout/conditional';

export default function Page() {
	const t = useTranslations('SignUp.auth');
	const [state, formAction, isPending] = useActionState(SignUpAction, {
		status: 'INITIAL',
	});
	let nameError: string | undefined = undefined;
	let lastNameError: string | undefined = undefined;
	let emailError: string | undefined = undefined;
	let passwordError: string | undefined = undefined;
	if (state.status === 'WRONG_INPUT') {
		nameError = state.errors.name?.[0];
		lastNameError = state.errors.lastName?.[0];
		emailError = state.errors.email?.[0];
		passwordError = state.errors.password?.[0];
	}

	let shouldDisplayNotification = false;
	let notificationMessage = '';
	let isSuccess = false;
	if (state.status !== 'WRONG_INPUT' && state.status !== 'INITIAL') {
		shouldDisplayNotification = !!state.message;
		notificationMessage = state.message;
		isSuccess = state.success;
	}

	return (
		<Container as="main" fullWidth className="relative h-screen">
			<Stack
				align="center"
				justify="center"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120"
			>
				<LoginHeader
					title={t('header.title')}
					subTitle={t('header.subtitle')}
				/>
				<AuthForm action={formAction}>
					<Input
						name="name"
						type="text"
						placeholder={t('form.first_name_label')}
						required
						min={2}
						max={30}
						error={nameError}
					/>
					<Input
						name="lastName"
						type="text"
						placeholder={t('form.last_name_label')}
						required
						min={2}
						max={30}
						error={lastNameError}
					/>
					<Input
						name="email"
						type="email"
						placeholder={t('form.email_label')}
						required
						error={emailError}
					/>
					<Input
						name="password"
						type="password"
						placeholder={t('form.password_label')}
						required
						min={3}
						max={12}
						error={passwordError}
					/>
					<Stack gap="sm">
						<Button
							radius="md"
							className={cn('font-sans', isPending && 'cursor-not-allowed')}
							disabled={isPending}
							type="submit"
						>
							{isPending ? (
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
							) : (
								<>{t('form.submit_button')}</>
							)}
						</Button>

						<Conditional test={shouldDisplayNotification}>
							<Text
								className={cn(
									'flex gap-2 items-center justify-center text-sm',
									isSuccess ? 'text-green-700' : 'text-error',
								)}
							>
								<Conditional test={isSuccess} fallback={<CircleX size={16} />}>
									<BadgeCheck size={16} />
								</Conditional>
								{notificationMessage}
							</Text>
						</Conditional>
						<Text as="p" className="self-center mt-2">
							<Text as="span" className="text-sm text-gray-700">
								{t('footer.existing_account')}
							</Text>
							<Link
								href={'/sign-in'}
								className="text-primary hover:text-none p-0 ms-2 text-sm underline font-bold"
							>
								{t('footer.login_link')}
							</Link>
						</Text>
					</Stack>
				</AuthForm>
			</Stack>
		</Container>
	);
}
