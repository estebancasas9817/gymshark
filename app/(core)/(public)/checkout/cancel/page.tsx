import { Metadata } from 'next';
import { CheckoutCancel } from './components/checkout-cancel';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const metadata: Metadata = {
	title: 'Payment Cancelled | Gymshark',
	description: 'Your checkout process was cancelled or interrupted.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Payment Cancelled | Gymshark',
		description: 'Your checkout process was cancelled or interrupted.',
		url: `${baseUrl}/checkout/cancel`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default function CheckoutCancelPage() {
	return <CheckoutCancel />;
}
