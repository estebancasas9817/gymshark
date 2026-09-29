import { Container } from '@/components/layout/container';
import { PageProps } from '@/types/next';
import { ProductListHeader } from './components/product-list-header';
import { ProductListBody } from './components/product-list-body';
import { RouteParams } from './types/product-list-types';
import { QueryParams } from 'next-intl/navigation';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Metadata } from 'next';

export async function generateMetadata(
	props: PageProps<RouteParams, QueryParams>,
): Promise<Metadata> {
	const params = await props.params;
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;

	const data = await getCategoryBySlug(slug);

	if (!data) {
		return {
			title: 'Category Not Found | Gymshark',
			description: 'The requested category could not be found.',
		};
	}

	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
	const pageUrl = `${baseUrl}/${data.slug}`;
	const title = `${data.name} | Gymshark`;
	const description = data.description;

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
			images: [
				{
					url: data.imageUrl,
					width: 1200,
					height: 630,
					alt: data.name,
				},
			],
			locale: 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [data.imageUrl],
		},
	};
}

export default async function Page(props: PageProps<RouteParams, QueryParams>) {
	const [params, searchParams] = await Promise.all([
		props.params,
		props.searchParams,
	]);
	const { category, subCategory } = params;
	const slug = `${category}/${subCategory}`;
	const { name } = await getCategoryBySlug(slug);
	if (!name) {
		notFound();
	}

	return (
		<Container as="main">
			<Suspense>
				<ProductListHeader slug={slug} searchParams={searchParams} />
			</Suspense>
			<ProductListBody
				params={params}
				searchParams={searchParams}
				slug={slug}
			/>
		</Container>
	);
}
