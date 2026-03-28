import { Container } from '@/components/layout/container';
import { ProductDisplayContextProvider } from './context/product-display-context';
import { Gallery } from './components/gallery';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { getProduct } from '@/libs/firebase/db/products/get-product';
import { PageProps } from '@/types/next';
import { notFound } from 'next/navigation';

type RouteParams = { productId: string };
type QueryParams = {};

const Page = async ({ params }: PageProps<RouteParams, QueryParams>) => {
	const { productId } = await params;
	const product = await getProduct(productId);
	if (!product) {
		notFound();
	}
	const { name, variants } = product;

	return (
		<Container as="main" fullWidth>
			<ProductDisplayContextProvider variant={variants[0]}>
				<Stack direction="row" className="gap-0">
					<Gallery />
					<Container fullWidth className="px-36 basis-1/2">
						<Heading as="h1" size="sm">
							{name}
						</Heading>
					</Container>
				</Stack>
			</ProductDisplayContextProvider>
		</Container>
	);
};

export default Page;
