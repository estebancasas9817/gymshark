'use client';

import Image from 'next/image';
import Plate from '@/public/tier-1.png';
import { cn } from '@/utils/cn/cn';
import { useBreakpoint } from '@/hooks/use-breakpoint';

interface GymsharkPlateProps {
	isDesktopInstance?: boolean;
}
export const GymsharkPlate = ({
	isDesktopInstance = false,
}: GymsharkPlateProps) => {
	const isDesktop = useBreakpoint('lg');
	const isTabletOrMobile = isDesktop === false;
	const figurePlateStyles =
		(isTabletOrMobile && isDesktopInstance) ||
		(!isDesktopInstance && !isTabletOrMobile)
			? 'hidden'
			: '';

	return (
		<figure
			className={cn(
				!isTabletOrMobile &&
					isDesktopInstance &&
					'absolute bottom-0 left-1/2 -translate-x-1/2',
				figurePlateStyles,
			)}
		>
			<Image src={Plate} alt="Tier 1 plate" width={600} height={600} />
		</figure>
	);
};
