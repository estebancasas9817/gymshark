import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ProductCard } from '@/features/product-card';
import Image from 'next/image';

export const ProductListCollectionHighlight = () => {
	// TODO: Call new service for collectionHighlight

	return (
		<Stack
			direction="row"
			className="col-span-4 py-24 relative"
			justify="between"
		>
			<figure className="">
				<Image
					src="https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg"
					alt=""
					width={350}
					height={300}
				/>
			</figure>
			<Stack gap="md" className="h-100 absolute bottom-26 right-0">
				<Heading as="h3">ALL ACCESSORIES</Heading>
				<Text>
					A workout outfit is never complete without sports accessories.
				</Text>
				<div className="grid grid-cols-2 gap-1">
					<ProductCard
						imageSrc={[
							'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg',
						]}
						color="red"
						desc="description"
						name="Name"
						price="300"
						href=""
						productCardClassNames="mb-0"
						imageClassNames="h-60"
					/>
					<ProductCard
						imageSrc={[
							'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg',
						]}
						color="red"
						desc="description"
						name="Name"
						price="300"
						href=""
						productCardClassNames="mb-0"
						imageClassNames="h-60"
					/>
				</div>
			</Stack>
		</Stack>
	);
};
