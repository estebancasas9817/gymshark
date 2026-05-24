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

export default function Page() {
	const t = useTranslations('SignUp.auth');
	const [state, formAction, isPending] = useActionState()

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
					/>
					<Input
						name="lastName"
						type="text"
						placeholder={t('form.last_name_label')}
						required
					/>
					<Input
						name="birth"
						type="date"
						placeholder={t('form.dob_label')}
						required
					/>
					<Input
						name="email"
						type="email"
						placeholder={t('form.email_label')}
						required
					/>
					<Input
						name="password"
						type="password"
						placeholder={t('form.password_label')}
						required
					/>
					<Stack gap="sm">
						<Button radius="md" className="font-sans">
							{t('form.submit_button')}
						</Button>
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
