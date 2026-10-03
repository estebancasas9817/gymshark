import { RequestPassword } from './components/request-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Request Reset Password | Fit Store',
	description:
		'Forgot your password? Enter your email address to receive instructions and reset your Fit Store account password.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Reset Password | Fit Store',
		description:
			'Enter your email address to receive password reset instructions for your Fit Store account.',
		url: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/request`,
		siteName: 'Fit Store',
		type: 'website',
	},
};

export default function Page() {
	return <RequestPassword />;
}
