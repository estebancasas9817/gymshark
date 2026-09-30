import { Stack } from '@/components/layout/stack';
import Image from 'next/image';

interface ProductListBannerProps {
	imageUrl: string;
}
export const ProductListBanner = ({ imageUrl }: ProductListBannerProps) => {
	return (
		<Stack direction="row" className="gap-0">
			<figure className="relative w-full aspect-3/4 md:aspect-3/2 max-h-120 overflow-hidden">
				<Image
					src={imageUrl}
					alt="image banner"
					fill
					priority
					fetchPriority="high"
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
				/>
			</figure>
		</Stack>
	);
};
