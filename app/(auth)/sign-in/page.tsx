import { Metadata } from 'next';
import { SignIn } from './components/sign-in';

export const metadata: Metadata = {
	title: 'Sign In | Fit Store',
	description:
		'Log in to your Fit Store account to view your orders, access exclusive drops, and manage your tier benefits.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Sign In | Fit Store',
		description:
			'Log in to your Fit Store account to view your orders and track your progress.',
		url: `${process.env.NEXT_PUBLIC_APP_URL}/account/login`,
		siteName: 'Fit Store',
		type: 'website',
	},
};

export default function Page() {
	return <SignIn />;
}
