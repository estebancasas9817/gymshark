import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
	alt: string;
	imageUrl: string;
	title: string;
	description?: string;
}
export const CategoryCard = ({
	alt,
	imageUrl,
	title,
	description,
}: CategoryCardProps) => {
	return (
		<Stack as="div" className="flex-1" gap="md">
			<figure className="w-full relative h-120">
				<Link href={''}>
					<Image src={imageUrl} alt={alt} fill />
				</Link>
			</figure>
			<div>
				<Heading as="h6" size="sm">
					<Link href={''}>{title}</Link>
				</Heading>
				<Conditional test={!!description}>
					<Text as="p" className="text-sm text-gray-500 mt-2">
						<Link href={''}>{description}</Link>
					</Text>
				</Conditional>
			</div>
		</Stack>
	);
};
