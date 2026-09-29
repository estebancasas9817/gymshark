import { RequestPassword } from './components/request-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Request Reset Password | Gymshark',
	description:
		'Forgot your password? Enter your email address to receive instructions and reset your Gymshark account password.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Reset Password | Gymshark',
		description:
			'Enter your email address to receive password reset instructions for your Gymshark account.',
		url: `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default function Page() {
	return <RequestPassword />;
}
