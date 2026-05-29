import { Container } from '@/components/layout/container';
import { ProductDisplayContextProvider } from './context/product-display-context';
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
import { ProductCardContainer } from '@/features/product-card-container';
import { Carousel } from '@/features/carousel';
import { PaymentCarousel } from './components/payment-carousel';
import { PaymentSuggestions } from './components/payment-suggestions';
import { ShopTheLook } from './components/shop-the-look';
import { RecentlyView } from './components/recently-view';

type RouteParams = { productSlug: string };
type QueryParams = {};

const Page = async ({ params }: PageProps<RouteParams, QueryParams>) => {
	const { productSlug } = await params;
	const product = await getProduct(productSlug);
	if (!product) {
		notFound();
	}
	const { name, variants, price, discount, parentCategoryId } = product;

	return (
		<Container as="main" fullWidth>
			<ProductDisplayContextProvider variant={variants[0]}>
				<Stack direction="row" className="gap-0">
					<Gallery />
					<Container fullWidth className="px-37.5 w-1/2">
						<Heading as="h1" size="sm" className="mb-2">
							{name}
						</Heading>
						<Text as="span" className="text-tertiary block mb-2">
							Regular
						</Text>
						<Text as="span" className="font-bold">
							${price}
						</Text>
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
						<VariantSelectorGrid variants={variants} />
						<SizePicker />
						<PaymentSuggestions price={price} />
						<PaymentCarousel />
						<ShopTheLook />
					</Container>
				</Stack>
			</ProductDisplayContextProvider>

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
				<ProductCardContainer stackClassNames="flex-wrap" />
			</ProductCollection>

			<Carousel sectionName="WE RECOMMEND" className="w-full">
				<ProductCardContainer />
			</Carousel>

			<RecentlyView />
		</Container>
	);
};

export default Page;
