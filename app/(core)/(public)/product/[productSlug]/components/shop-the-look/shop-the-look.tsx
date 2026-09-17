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
				<Stack direction="row" className="mt-4">
					{products.slice(0, 4).map(({ sku, id }) => (
						<figure
							key={`${id} ${sku.color}`}
							className="relative w-22 aspect-88/104 overflow-hidden rounded-sm"
						>
							<Image
								src={sku.images[0]}
								alt="get the look alt"
								fill
								sizes="88px"
								className="object-cover"
							/>
						</figure>
					))}
				</Stack>
			</Link>
		</Stack>
	);
};
