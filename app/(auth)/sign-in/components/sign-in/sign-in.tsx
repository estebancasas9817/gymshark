'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { signInAction } from '../../actions';
import { signIn, useSession } from 'next-auth/react';
import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { LoginHeader } from '../login-header';
import { AuthForm } from '@/components/ui/auth-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/utils/cn/cn';
import { Divider } from '@/components/ui/divider';
import { Text } from '@/components/ui/text';
import { FcGoogle } from 'react-icons/fc';
import { Conditional } from '@/components/layout/conditional';
import { CircleX } from 'lucide-react';

export const SignIn = () => {
	const t = useTranslations('Login.auth');
	const router = useRouter();
	const { update } = useSession();
	const [state, formAction, isPending] = useActionState(signInAction, {
		status: 'INITIAL',
		success: false,
	});
	const [isGooglePending, setIsGooglePending] = useState<boolean>(false);
	let emailError = undefined;
	let passwordError = undefined;
	if (state.status === 'WRONG_INPUT') {
		passwordError = state.errors.password?.[0];
		emailError = state.errors.email?.[0];
	}
	const isFailedStatus = state.status === 'UNEXPECTED_ERROR';
	let errorMessage: string | undefined = undefined;
	if (state.status === 'UNEXPECTED_ERROR') {
		errorMessage = state.message;
	}

	useEffect(() => {
		if (state?.status === 'SUCCESS') {
			update().then(() => {
				router.push('/account');
			});
		}
	}, [state?.status, router]);

	const handleGoogleLogin = async () => {
		setIsGooglePending(true);
		await signIn('google', { redirectTo: '/account' });
		setIsGooglePending(false);
	};
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
						error={passwordError}
					/>
					<Stack gap="sm">
						<Button
							variant="inline"
							className="text-primary hover:text-none text-sm pt-0"
						>
							<Link href="/reset-password/request">
								{t('form.forgot_password')}
							</Link>
						</Button>
						<Button
							radius="md"
							className={cn('font-sans', isPending && 'cursor-not-allowed')}
							type="submit"
							disabled={isPending}
						>
							{isPending ? (
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary border-t-primary" />
							) : (
								<>{t('form.submit_button')}</>
							)}
						</Button>
						<Divider className="my-4" />
						<Button
							radius="md"
							variant="secondary"
							className={cn(
								'border flex gap-4 items-center group',
								isGooglePending && 'cursor-not-allowed',
							)}
							onClick={handleGoogleLogin}
							disabled={isGooglePending}
						>
							{isGooglePending ? (
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent group-hover:border-secondary group-hover:border-t-primary" />
							) : (
								<>
									<Text as="span" className="group-hover:text-secondary">
										{t('form.google_button')}
									</Text>
									<FcGoogle />
								</>
							)}
						</Button>
						<Conditional test={isFailedStatus}>
							<Text
								className={cn(
									'flex gap-2 items-center justify-center text-sm',
									'text-error',
								)}
							>
								<CircleX size={16} />

								{errorMessage}
							</Text>
						</Conditional>
						<Text as="p" className="self-center mt-2">
							<Text as="span" className="text-sm text-gray-700">
								{t('footer.no_account')}
							</Text>
							<Link
								href={'/sign-up'}
								className="text-primary hover:text-none p-0 ms-2 text-sm underline font-bold"
							>
								{t('footer.sign_up_link')}
							</Link>
						</Text>
					</Stack>
				</AuthForm>
			</Stack>
		</Container>
	);
};
