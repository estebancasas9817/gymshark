import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { getYouMightLike } from '@/libs/firebase/db/products/get-products-you-might-like';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ShopTheLookProps {
	categorySlug: string;
	excludeProductId: string;
}

export const ShopTheLook = async ({
	categorySlug,
	excludeProductId,
}: ShopTheLookProps) => {
	const products = await getYouMightLike(categorySlug, excludeProductId);
	const amountOfProducts = `${products.length} Products`;

	if (products.length === 0) return null;

	return (
		<Stack className="border border-particles-grey p-4">
			<Link href="#GET_THE_LOOK">
				<Stack direction="row" align="center" justify="between">
					<Stack direction="row" align="center">
						<Heading as="h6" size="sm" className="text-sm">
							YOU MIGHT LIKE
						</Heading>
						<Text as="span" variant="tertiary" className="text-xs">
							{amountOfProducts}
						</Text>
					</Stack>
					<ChevronRight size={14} />
				</Stack>
				<Stack direction="row">
					{products.slice(0, 3).map(({ sku, id }) => (
						<figure className="h-30" key={`${id} ${sku.color}`}>
							<Image
								src={sku.images[0]}
								alt="get the look alt"
								width={88}
								height={104}
								className="h-30 object-contain"
							/>
						</figure>
					))}
				</Stack>
			</Link>
		</Stack>
	);
};
