import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { LoginHeader } from './components/login-header';
import { Input } from '@/components/ui/input';
import { AuthForm } from '@/components/ui/auth-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Link from 'next/link';

export default function Page() {
	const t = useTranslations('Login.auth');

	return (
		<Container as="main" fullWidth className="relative h-screen">
			<Stack
				align="center"
				justify="center"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120"
			>
				<LoginHeader />
				<AuthForm>
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
						<Button
							variant="inline"
							className="text-primary hover:text-none text-sm pt-0"
						>
							{t('form.forgot_password')}
						</Button>
						<Button radius="md" className="font-sans">
							{t('form.submit_button')}
						</Button>
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
}
