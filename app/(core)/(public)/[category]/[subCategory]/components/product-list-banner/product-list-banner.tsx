import { Stack } from '@/components/layout/stack';
import Image from 'next/image';

interface ProductListBannerProps {
	imageUrl: string;
}
export const ProductListBanner = ({ imageUrl }: ProductListBannerProps) => {
	return (
		<Stack direction="row" className="gap-0">
			<figure className="relative w-full aspect-3/4 md:aspect-3/2">
				<Image
					src={imageUrl}
					alt="image banner"
					fill
					priority
					fetchPriority="high"
					className="object-cover"
					sizes="100vw"
				/>
			</figure>
		</Stack>
	);
};
