import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ProductListBanner } from '../product-list-banner';

export const ProductListHeader = () => {
	return (
		<Stack as="section" className="mb-28">
			<Heading as="h1" className="mt-10 text-[44px]">
				ALL ACCESSORIES
			</Heading>
			<Text as="span" className="text-xs text-tertiary">
				221 Products
			</Text>
			<Text as="p" size="xl" className="max-w-200 text-gray-700 mb-2">
				A workout outfit is never complete without sports accessories. Because
				the devil is in the detail, our sports accessories ensure you're ready
				for every session. From sports bags to toilet bags, socks to caps and
				water bottles to shakers, you'll never be short of anything.
			</Text>
			<ProductListBanner />
		</Stack>
	);
};
