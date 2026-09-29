import { Metadata } from 'next';
import { VerifyAccount } from './verify-account';

interface PageProps {
	searchParams: Promise<{ token?: string; email?: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
	title: 'Verify Account | Gymshark',
	description: 'Verify your Gymshark account email address.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Verify Account | Gymshark',
		description: 'Verify your Gymshark account email address.',
		url: `${baseUrl}/verify-account`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default async function VerifyAccountPage({ searchParams }: PageProps) {
	const { token, email } = await searchParams;

	return <VerifyAccount token={token} email={email} />;
}
