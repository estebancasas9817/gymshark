import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import Image from 'next/image';
import Link from 'next/link';

interface BannerProps {
	title: string;
	description: string;
	button: string;
	href: string;
	image: string;
}

export const Banner = ({
	title,
	description,
	button,
	href,
	image,
}: BannerProps) => {
	return (
		<Container
			fullWidth
			className="w-full overflow-hidden relative aspect-3/4 md:aspect-4/3 lg:aspect-video h-150"
		>
			<figure>
				<Image
					src={image}
					alt="Hero Banner"
					className="w-full h-full object-cover object-[center_30%]"
					fill
					priority
					fetchPriority="high"
					sizes="100vw"
				/>
			</figure>
			<Stack className="absolute m-4 lg:m-12 bottom-0 w-100" gap="lg">
				<Heading as="h2" className="text-secondary text-2xl">
					{title}
				</Heading>
				<Text as="p" className="text-secondary text-sm font-bold">
					{description}
				</Text>
				<Stack direction="row" gap="lg">
					<Button variant="inline" className="p-0" size="md">
						<Link href={href}>{button}</Link>
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};
