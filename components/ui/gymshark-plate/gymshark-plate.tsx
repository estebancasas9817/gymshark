import Image from 'next/image';
import Plate from '@/public/tier-1.png';
export const GymsharkPlate = () => {
	return (
		<figure className="absolute bottom-0 left-1/2 -translate-x-1/2">
			<Image src={Plate} alt="Tier 1 plate" width={600} height={600} />
		</figure>
	);
};
