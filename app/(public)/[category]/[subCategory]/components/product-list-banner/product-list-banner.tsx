import { Stack } from '@/components/layout/stack';
import Image from 'next/image';

interface ProductListBannerProps {
	imageUrl: string;
}
export const ProductListBanner = ({ imageUrl }: ProductListBannerProps) => {
	return (
		<Stack direction="row" className="gap-0">
			<figure className="relative w-full h-100">
				<Image
					src={imageUrl}
					alt="image"
					fill
					fetchPriority="high"
					className="object-cover"
				/>
			</figure>
		</Stack>
	);
};
