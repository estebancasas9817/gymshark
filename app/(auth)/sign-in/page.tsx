import { Metadata } from 'next';
import { SignIn } from './components/sign-in';

export const metadata: Metadata = {
	title: 'Sign In | Gymshark',
	description:
		'Log in to your Gymshark account to view your orders, access exclusive drops, and manage your tier benefits.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Sign In | Gymshark',
		description:
			'Log in to your Gymshark account to view your orders and track your progress.',
		url: `${process.env.NEXT_PUBLIC_APP_URL}/account/login`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default function Page() {
	return <SignIn />;
}
