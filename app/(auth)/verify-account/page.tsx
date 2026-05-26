import { VerifyAccount } from './verify-account';

interface PageProps {
	searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function VerifyAccountPage({ searchParams }: PageProps) {
	const { token, email } = await searchParams;

	return <VerifyAccount token={token} email={email} />;
}
