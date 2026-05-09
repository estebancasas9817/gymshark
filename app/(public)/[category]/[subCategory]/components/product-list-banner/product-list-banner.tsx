import { Stack } from '@/components/layout/stack';
import Image from 'next/image';

export const ProductListBanner = () => {
	return (
		<Stack direction="row" className="gap-0">
			<figure className="relative basis-1/4 h-100">
				<Image
					src="https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777944922/photo-1585475686930-8fcb2728eb6b_ml5uyu.jpg"
					alt="image"
					fill
				/>
			</figure>
			<figure className="relative basis-2/4 h-100">
				<Image
					src="https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777945492/photo-1584735935682-2f2b69dff9d2_hm2vvl.jpg"
					alt="image"
					fill
				/>
			</figure>
			<figure className="relative basis-1/4 h-100">
				<Image
					src="https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777944015/photo-1771270786606-f5a0e57db762_qh6eya.jpg"
					alt="image"
					fill
				/>
			</figure>
		</Stack>
	);
};
