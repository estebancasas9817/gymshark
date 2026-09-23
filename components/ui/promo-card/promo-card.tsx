import Image, { StaticImageData } from 'next/image';
import { Text } from '../text';
import { Conditional } from '@/components/layout/conditional';
import Link from 'next/link';

interface PromoCardProps {
	title: string;
	alt: string;
	src: StaticImageData;
	href: string;
	index: number;
}

export const PromoCard = ({ title, alt, src, href, index }: PromoCardProps) => {
	const promoCardContent = (
		<>
			<figure>
				<Image src={src} alt={alt} width={175} height={100} />
			</figure>
			<Text
				as="p"
				className="text-xs font-sans text-primary font-bold p-2 bg-border-secondary mb-2 w-43.75 h-12"
			>
				{title.toUpperCase()}
			</Text>
		</>
	);
	return (
		<article>
			<Conditional
				test={index !== 2}
				fallback={<Link href={href}>{promoCardContent}</Link>}
			>
				<a href={href} target="_blank">
					{promoCardContent}
				</a>
			</Conditional>
		</article>
	);
};
