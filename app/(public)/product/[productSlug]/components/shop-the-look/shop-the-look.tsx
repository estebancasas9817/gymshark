import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ShopTheLook = () => {
	return (
		<Stack className="border border-particles-grey p-4">
			<Link href="#GET_THE_LOOK">
				<Stack direction="row" align="center" justify="between">
					<Stack direction="row" align="center">
						<Heading as="h6" size="sm" className="text-sm">
							GET THE LOOK
						</Heading>
						<Text as="span" variant="tertiary" className="text-xs">
							4 Products
						</Text>
					</Stack>
					<ChevronRight size={14} />
				</Stack>
				<Stack direction="row">
					<figure className="h-30">
						<Image
							src="https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg"
							alt="get the look alt"
							width={88}
							height={104}
							className="h-30"
						/>
					</figure>
					<figure className="h-30">
						<Image
							src="https://res.cloudinary.com/dqfcdiyvm/image/upload/v1774721092/photo-1584863495140-a320b13a11a8_xtfosu.jpg"
							alt="get the look alt"
							width={88}
							height={104}
							className="h-30"
						/>
					</figure>
				</Stack>
			</Link>
		</Stack>
	);
};
