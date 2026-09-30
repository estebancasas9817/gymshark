import { DepartmentLayout } from '@/features/department-layout';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const metadata: Metadata = {
	title: 'Gymshark Official Store | Gym Clothes & Workout Wear',
	description:
		'Unlock your potential with Gymshark gym clothes and workout wear. Engineered for performance and comfort. Free shipping options available.',
	alternates: {
		canonical: baseUrl,
	},
	openGraph: {
		title: 'Gymshark Official Store | Gym Clothes & Workout Wear',
		description:
			'Unlock your potential with Gymshark gym clothes and workout wear. Engineered for performance and comfort.',
		url: baseUrl,
		siteName: 'Gymshark',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: `${baseUrl}/og-home.jpg`,
				width: 1200,
				height: 630,
				alt: 'Gymshark Official Store',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Gymshark Official Store | Gym Clothes & Workout Wear',
		description:
			'Unlock your potential with Gymshark gym clothes and workout wear. Engineered for performance and comfort.',
		images: [`${baseUrl}/og-home.jpg`],
	},
};

export default async function Home() {
	return (
		<main>
			<DepartmentLayout department="home" />
		</main>
	);
}
