import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

interface ResetPasswordProps {
	userFirstname?: string;
	resetUrl: string;
	supportEmail?: string;
}

export default function ResetPassword({
	userFirstname = 'Athlete',
	resetUrl,
	supportEmail = 'support@fitstore-demo.dev',
}: ResetPasswordProps) {
	return (
		<Html lang="es">
			<Head />
			<Preview>Restablece tu contraseña de Fit Store</Preview>
			<Tailwind>
				<Body className="bg-gray-100 font-sans py-10">
					<Container className="bg-white mx-auto max-w-120 rounded-xl border border-solid border-gray-200 px-8 py-8">
						{/* Header */}
						<Section className="bg-black rounded-lg px-6 py-8 text-center">
							<Text className="text-white text-2xl font-extrabold tracking-wide m-0">
								FIT STORE
							</Text>
						</Section>

						<Hr className="border-black border-t my-8" />

						{/* Body */}
						<Heading className="text-black text-2xl font-extrabold mb-6">
							RESET YOUR PASSWORD
						</Heading>

						<Text className="text-base font-semibold text-black mb-4">
							Hi {userFirstname},
						</Text>

						<Text className="text-gray-600 text-base leading-6 mb-4">
							We received a request to reset the password for your account.
							Click the button below to choose a new password. No changes have
							been made yet.
						</Text>

						<Text className="text-gray-600 text-base leading-6 mb-8">
							If you didn&apos;t ask to reset your password, you can safely
							ignore this email — your account is still secure.
						</Text>

						{/* CTA */}
						<Section className="text-center mb-8">
							<Button
								href={resetUrl}
								className="bg-black text-white text-sm font-bold tracking-wide rounded-full px-8 py-4 no-underline box-border"
							>
								RESET MY PASSWORD
							</Button>
						</Section>

						<Hr className="border-gray-200 border-t my-8" />

						{/* Footer */}
						<Text className="text-gray-400 text-xs text-center leading-5 m-0">
							NEED HELP? CONTACT OUR SUPPORT SQUAD AT{' '}
							<Link
								href={`mailto:${supportEmail}`}
								className="text-gray-400 underline"
							>
								{supportEmail.toUpperCase()}
							</Link>
						</Text>
						<Text className="text-gray-400 text-xs text-center mt-2 m-0">
							© 2026 Fit Store. All rights reserved.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

ResetPassword.PreviewProps = {
	userFirstname: 'Esteban',
	resetUrl: 'https://gymshark-clone.com/reset-password?token=abc123',
} satisfies ResetPasswordProps;
