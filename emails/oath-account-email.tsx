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

interface OAuthAccountEmailProps {
	userFirstname?: string;
	userEmail: string;
	provider?: 'Google' | 'Apple' | 'GitHub';
	supportEmail?: string;
	loginUrl: string;
}

export default function OAuthAccountEmail({
	userFirstname = 'Athlete',
	userEmail,
	provider = 'Google',
	supportEmail = 'support@fitstore-demo.dev',
	loginUrl,
}: OAuthAccountEmailProps) {
	return (
		<Html lang="es">
			<Head />
			<Preview>
				Tu cuenta usa inicio de sesión con {provider}, no contraseña
			</Preview>
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
							NO PASSWORD TO RESET
						</Heading>

						<Text className="text-base font-semibold text-black mb-4">
							Hi {userFirstname},
						</Text>

						<Text className="text-gray-600 text-base leading-6 mb-4">
							We received a request to reset the password for{' '}
							<span className="text-black font-semibold">{userEmail}</span>.
							This account was created using {provider}, so it doesn&apos;t have
							a password set up.
						</Text>

						<Text className="text-gray-600 text-base leading-6 mb-8">
							Just head to the sign in page and continue with {provider}. If you
							didn&apos;t request this, you can safely ignore this email.
						</Text>

						{/* CTA */}
						<Section className="text-center mb-8">
							<Button
								href={loginUrl}
								className="bg-black text-white text-sm font-bold tracking-wide rounded-full px-8 py-4 no-underline box-border"
							>
								GO TO SIGN IN
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

OAuthAccountEmail.PreviewProps = {
	userFirstname: 'Esteban',
	userEmail: 'esteban@example.com',
	provider: 'Google',
	loginUrl: 'https://gymshark-clone.com/login',
} satisfies OAuthAccountEmailProps;
