import Image, { StaticImageData } from 'next/image';
import { Text } from '../text';

interface PromoCardProps {
	title: string;
	alt: string;
	src: StaticImageData;
}

export const PromoCard = ({ title, alt, src }: PromoCardProps) => {
	return (
		<article>
			<a href="" target="_blank">
				<figure>
					<Image src={src} alt={alt} width={175} height={100} />
				</figure>
				<Text
					as="p"
					className="text-xs font-sans text-primary font-bold p-2 bg-border-secondary relative bottom-1 w-26/27 ms-0.75 h-12"
				>
					{title.toUpperCase()}
				</Text>
			</a>
		</article>
	);
};
