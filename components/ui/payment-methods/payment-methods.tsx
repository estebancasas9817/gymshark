import Image, { StaticImageData } from 'next/image';

interface SocialLinkProps {
	src: StaticImageData;
	alt: string;
}

export const PaymentMethods = ({ src, alt }: SocialLinkProps) => {
	return (
		<figure>
			<Image src={src} alt={alt} width={40} />
		</figure>
	);
};
