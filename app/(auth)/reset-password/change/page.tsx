import { Suspense } from 'react';
import { ChangePassword } from './components/change-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Change Password | Gymshark',
	description: 'Set a new password for your Gymshark account.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Change Password | Gymshark',
		description: 'Set a new password for your Gymshark account.',
		url: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/change`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default function Page() {
	return (
		<Suspense>
			<ChangePassword />
		</Suspense>
	);
}
