import { Container } from '@/components/layout/container';
import { Gallery } from './components/gallery';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { getProduct } from '@/libs/firebase/db/products/get-product';
import { PageProps } from '@/types/next';
import { notFound } from 'next/navigation';
import { ActionPill } from '@/components/ui/action-pill';
import { Heart, Share, Star } from 'lucide-react';
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
		<Container as="main" fullWidth>
			<Stack direction="row" className="gap-0">
				<Gallery galleryImages={sku.images} />
				<Container fullWidth className="px-37.5 w-1/2">
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
					<Stack direction="row" gap="lg" className="py-12">
						<ActionPill className="cursor-pointer hover:bg-gray-200">
							<Stack
								direction="row"
								align="center"
								justify="center"
								className="gap-1"
							>
								<Star size={12} fill="black" />
								<Text as="span" className="text-xs">
									4.1
								</Text>
								<Text className="underline text-xs">(66)</Text>
							</Stack>
						</ActionPill>
						<ActionPill className="cursor-pointer hover:bg-gray-200">
							<Heart size={18} />
						</ActionPill>
						<ActionPill className="cursor-pointer hover:bg-gray-200">
							<Share size={18} />
						</ActionPill>
					</Stack>
					<Suspense>
						<VariantSelectorGrid variants={skus} selectedVariant={sku} />
					</Suspense>
					<SizePicker selectedVariant={sku} />
					<PaymentSuggestions price={basePrice} />
					<PaymentCarousel />
					<ShopTheLook />
				</Container>
			</Stack>

			<ProductCollection
				sectionName="YOU MIGHT LIKE"
				className="mt-30 px-10 w-full"
				sectionId="GET_THE_LOOK"
				sectionDescription={
					<Text as="span" variant="tertiary">
						We think these products pair perfectly
					</Text>
				}
			>
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
