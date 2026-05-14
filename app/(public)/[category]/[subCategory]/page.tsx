import { Container } from '@/components/layout/container';
import { PageProps } from '@/types/next';
import { ProductListHeader } from './components/product-list-header';
import { ProductListBody } from './components/product-list-body';
import { RouteParams } from './types/product-list-types';
import { QueryParams } from 'next-intl/navigation';

// TODO: ADD generateMetadata
export default function Page(props: PageProps<RouteParams, QueryParams>) {
	return (
		<Container as="main">
			<ProductListHeader />
			<ProductListBody
				paramsPromise={props.params}
				searchParamsPromise={props.searchParams}
			/>
		</Container>
	);
}
