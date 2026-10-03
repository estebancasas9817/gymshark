import { DepartmentLayout } from '@/features/department-layout';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const metadata: Metadata = {
	title: 'Fit Store Official Store | Gym Clothes & Workout Wear',
	description:
		'Unlock your potential with Fit Store gym clothes and workout wear. Engineered for performance and comfort. Free shipping options available.',
	alternates: {
		canonical: baseUrl,
	},
	openGraph: {
		title: 'Fit Store Official Store | Gym Clothes & Workout Wear',
		description:
			'Unlock your potential with Fit Store gym clothes and workout wear. Engineered for performance and comfort.',
		url: baseUrl,
		siteName: 'Fit Store',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: `${baseUrl}/og-home.jpg`,
				width: 1200,
				height: 630,
				alt: 'Fit Store Official Store',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Fit Store Official Store | Gym Clothes & Workout Wear',
		description:
			'Unlock your potential with Fit Store gym clothes and workout wear. Engineered for performance and comfort.',
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
