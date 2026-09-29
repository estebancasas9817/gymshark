import { Metadata } from 'next';
import { CheckoutSuccess } from './components/checkout-success';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const metadata: Metadata = {
	title: 'Order Confirmed | Gymshark',
	description: 'Thank you for your order. Your purchase has been confirmed.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Order Confirmed | Gymshark',
		description: 'Thank you for your order. Your purchase has been confirmed.',
		url: `${baseUrl}/checkout/success`,
		siteName: 'Gymshark',
		type: 'website',
	},
};

export default function Page() {
	return <CheckoutSuccess />;
}
