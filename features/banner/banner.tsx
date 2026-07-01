import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import Image from 'next/image';

interface BannerProps {
	title: string;
	description: string;
	button: string;
	href: string;
}

export const Banner = ({ title, description, button, href }: BannerProps) => {
	return (
		<Container fullWidth className="w-full overflow-hidden relative h-150">
			<figure>
				<Image
					src={
						'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777426471/photo-1723117976381-d4dd0d0fa846_jofv0h.jpg'
					}
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
						Shop Now
					</Button>
					<Button variant="inline" className="p-0" size="md">
						{button}
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};
