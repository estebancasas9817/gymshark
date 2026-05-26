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
		errors: undefined,
		message: '',
		success: undefined,
	});

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
						name="firstName"
						type="text"
						placeholder={t('form.first_name_label')}
						required
						min={1}
						max={30}
						error={state.errors?.firstName?.[0]}
					/>
					<Input
						name="lastName"
						type="text"
						placeholder={t('form.last_name_label')}
						required
						min={1}
						max={30}
						error={state.errors?.lastName?.[0]}
					/>
					<Input
						name="email"
						type="email"
						placeholder={t('form.email_label')}
						required
						error={state.errors?.email?.[0]}
					/>
					<Input
						name="password"
						type="password"
						placeholder={t('form.password_label')}
						required
						min={8}
						max={12}
						error={state.errors?.password?.[0]}
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

						<Conditional test={!!state.message}>
							<Text
								className={cn(
									'flex gap-2 items-center justify-center text-sm',
									state.success ? 'text-green-700' : 'text-error',
								)}
							>
								<Conditional
									test={!!state.success}
									fallback={<CircleX size={16} />}
								>
									<BadgeCheck size={16} />
								</Conditional>
								{state.message}
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
