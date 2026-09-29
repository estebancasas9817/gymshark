import { SignUp } from './components/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Account | Gymshark',
	description:
		'Join the Gymshark community. Create an account to unlock exclusive rewards, faster checkout, order tracking, and training perks.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Create Account | Gymshark',
		description:
			'Join the Gymshark community. Create an account to unlock exclusive rewards, faster checkout, and order tracking.',
		url: `${process.env.NEXT_PUBLIC_APP_URL}/sign-up`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default function Page() {
	return <SignUp />;
}
