import { Container } from '@/components/layout/container';
import { Gallery } from './components/gallery';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { getProduct } from '@/libs/firebase/db/products/get-product';
import { PageProps } from '@/types/next';
import { notFound } from 'next/navigation';
import { Text } from '@/components/ui/text';
import { VariantSelectorGrid } from './components/variant-selector-grid';
import { SizePicker } from './components/size-picker';
import { ProductCollection } from './components/product-collection';
import { Carousel } from '@/features/carousel';
import { PaymentCarousel } from './components/payment-carousel';
import { PaymentSuggestions } from './components/payment-suggestions';
import { ShopTheLook } from './components/shop-the-look';
import { RecentlyView } from './components/recently-view';
import { Suspense } from 'react';
import { Conditional } from '@/components/layout/conditional';
import { ProductsYouMightLike } from './components/products-you-might-like';
import { ProductsRecommended } from './components/products-recommended';
import { SetRecentlyProducts } from './components/set-recently-products';
import { Recommendedkeletons } from '@/components/ui/recommended-skeletons';
import { ActionPillWrapper } from './components/action-pill-wrapper';

type RouteParams = { productSlug: string };
type QueryParams = { color: 'red' | 'black' | 'white' | 'blue' };

const Page = async ({
	params,
	searchParams,
}: PageProps<RouteParams, QueryParams>) => {
	const [{ productSlug }, { color }] = await Promise.all([
		params,
		searchParams,
	]);
	const product = await getProduct(productSlug, color);
	if (!product) {
		notFound();
	}

	const {
		name,
		sku,
		basePrice,
		discount = 0,
		skus,
		id,
		categorySlug,
	} = product;
	const fullPrice = basePrice + discount;

	return (
		<Container as="main" fullWidth className="pb-25">
			<Stack direction="column" className="gap-0 md:flex-col">
				<Gallery galleryImages={sku.images} />
				<Container fullWidth className=" md:px-8 lg:px-37.5 w-1/2">
					<Heading as="h1" size="sm" className="mb-2">
						{name}
					</Heading>
					<Text as="span" className="text-tertiary block mb-2">
						Regular
					</Text>
					<Stack direction="row" gap="xs">
						<Text as="span" className="font-bold">
							${basePrice}
						</Text>
						<Conditional test={!!discount}>
							<Text as="span" className="font-bold text-text-sale line-through">
								${fullPrice}
							</Text>
						</Conditional>
					</Stack>
					<ActionPillWrapper
						selectedVariant={sku}
						name={name}
						discount={discount}
					/>
					<Suspense>
						<VariantSelectorGrid variants={skus} selectedVariant={sku} />
					</Suspense>
					<SizePicker selectedVariant={sku} name={name} discount={discount} />
					<PaymentSuggestions price={basePrice} />
					<PaymentCarousel />
					<Suspense>
						<ShopTheLook categorySlug={categorySlug} excludeProductId={id} />
					</Suspense>
				</Container>
			</Stack>

			<ProductCollection
				sectionName="YOU MIGHT LIKE"
				className="mt-30 lg:px-10 w-full scroll-mt-40 ps-4 lg:ps-10"
				sectionId="GET_THE_LOOK"
				sectionDescription={
					<Text as="span" variant="tertiary">
						We think these products pair perfectly
					</Text>
				}
			>
				{/* TODO: UPDATE RESPONSIVE SKELETONS and use translations */}
				<Suspense fallback={<Recommendedkeletons />}>
					<ProductsYouMightLike
						categorySlug={categorySlug}
						excludeProductId={id}
					/>
				</Suspense>
			</ProductCollection>

			<Carousel sectionName="WE RECOMMEND" className="w-full">
				<Suspense fallback={<Recommendedkeletons />}>
					<ProductsRecommended
						categorySlug={categorySlug}
						excludeProductId={id}
					/>
				</Suspense>
			</Carousel>
			<SetRecentlyProducts productSlug={productSlug} color={color} />
			<RecentlyView productSlug={productSlug} color={color} />
		</Container>
	);
};

export default Page;
