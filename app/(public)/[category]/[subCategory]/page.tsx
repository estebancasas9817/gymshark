import { Container } from '@/components/layout/container';
import { PageProps } from '@/types/next';
import { ProductListHeader } from './components/product-list-header';
import { ProductListBody } from './components/product-list-body';
import { RouteParams } from './types/product-list-types';
import { QueryParams } from 'next-intl/navigation';
import { getCategoryBySlug } from '@/libs/firebase/db/categories/categories';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// TODO: ADD generateMetadata
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
			<ProductListBody params={params} searchParams={searchParams} />
		</Container>
	);
}
