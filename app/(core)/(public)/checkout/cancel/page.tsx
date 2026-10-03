import { Metadata } from 'next';
import { CheckoutCancel } from './components/checkout-cancel';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const metadata: Metadata = {
	title: 'Payment Cancelled | Fit Store',
	description: 'Your checkout was cancelled before payment completed.',
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: 'Payment Cancelled | Fit Store',
		description: 'Your checkout was cancelled before payment completed.',
		url: `${baseUrl}/checkout/cancel`,
		siteName: 'Fit Store',
		type: 'website',
	},
};

export default function CheckoutCancelPage() {
	return <CheckoutCancel />;
}
