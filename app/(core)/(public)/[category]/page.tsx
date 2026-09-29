import { PageProps } from '@/types/next';
import { DepartmentLayout } from '@/features/department-layout';
import NotFound from '@/app/not-found';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { Metadata } from 'next';

type RouteParams = { category: 'women' | 'men' };

const CATEGORY = { women: 'women', men: 'men' };
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { category } = await params;

	const categoryData = await getCategoryBySlug(category);

	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
	const pageUrl = `${baseUrl}/${category}`;

	if (!categoryData) {
		return {
			title: 'Category Not Found | Gymshark',
			description: 'The requested category could not be found.',
		};
	}

	const formattedName =
		categoryData.name.charAt(0).toUpperCase() + categoryData.name.slice(1);

	const title = `${formattedName}'s Workout Clothes & Gym Wear | Gymshark`;
	const description =
		categoryData.description ||
		`Shop Gymshark ${formattedName}'s gym clothes, leggings, activewear, and fitness accessories. Free shipping on qualifying orders.`;
	const imageUrl = categoryData.imageUrl || `${baseUrl}/og-default.jpg`;

	return {
		title,
		description,
		alternates: {
			canonical: pageUrl,
		},
		openGraph: {
			title,
			description,
			url: pageUrl,
			siteName: 'Gymshark',
			locale: 'en_US',
			type: 'website',
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: `${formattedName}'s Collection`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [imageUrl],
		},
	};
}

export default async function Page({ params }: PageProps<RouteParams>) {
	const routeParams = await params;
	if (
		CATEGORY.men === routeParams.category ||
		CATEGORY.women === routeParams.category
	) {
		return <DepartmentLayout department={routeParams.category} />;
	}
	return NotFound();
}
