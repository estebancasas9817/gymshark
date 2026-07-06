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
		<Container fullWidth className="w-full overflow-hidden relative h-150">
			<figure>
				<Image
					src={image}
					alt=""
					className="w-full h-full object-cover object-[center_30%]"
					fill
					priority
					fetchPriority="high"
				/>
			</figure>
			<Stack className="absolute m-12 bottom-0 w-100" gap="lg">
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
