import { ChevronButton } from '@/components/ui/chevron-button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RefObject, useEffect, useState } from 'react';

interface GalleryScrollerProps {
	scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export const GalleryScroller = ({
	scrollContainerRef,
}: GalleryScrollerProps) => {
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const indicatorHeight = 25;
	const topPosition = Math.ceil(scrollPercentage * (100 - indicatorHeight));
	const shouldDisableChevronUp = topPosition === 0;
	const shouldDisableChevronDown = topPosition === 75;

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const scrollTop = container.scrollTop;
			const fullHeight = container.scrollHeight;
			const containerHeight = container.clientHeight;
			const scrollableDistance = fullHeight - containerHeight;
			if (scrollableDistance > 0) {
				const progress = scrollTop / scrollableDistance;
				console.log('[progress]', { progress, scrollTop, scrollableDistance });
				setScrollPercentage(progress);
			}
		};

		container.addEventListener('scroll', handleScroll);

		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	const handleOnClick = (chevronDirection: 'up' | 'down') => {
		const container = scrollContainerRef.current;
		if (!container) return;
		const scrollTop = container.scrollTop;
		const fullHeight = container.scrollHeight;
		const containerHeight = container.clientHeight;
		const scrollableDistance = fullHeight - containerHeight;
		const scroll = scrollableDistance / 4;
		const scrollTo =
			chevronDirection === 'up' ? scrollTop - scroll : scrollTop + scroll;
		container.scrollTo({ top: scrollTo, behavior: 'smooth' });
	};

	return (
		<div className="fixed top-90 left-12 flex flex-col gap-4">
			<ChevronButton
				disabled={shouldDisableChevronUp}
				handleOnClick={() => handleOnClick('up')}
			>
				<ChevronUp size={14} />
			</ChevronButton>
			<div className="w-10 h-40 bg-white rounded-full relative shadow-lg overflow-hidden border border-gray-100">
				<div className="bg-(--color-gray-300) w-2 h-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-t-2xl rounded-b-2xl">
					<div
						className="absolute left-1/2 -translate-x-1/2 bg-zinc-800 rounded-full transition-all duration-100 ease-out w-2 rounded-t-2xl rounded-b-2xl"
						style={{
							height: `${indicatorHeight}%`,
							top: `${topPosition}%`,
						}}
					/>
				</div>
			</div>
			<ChevronButton
				disabled={shouldDisableChevronDown}
				handleOnClick={() => handleOnClick('down')}
			>
				<ChevronDown size={14} />
			</ChevronButton>
		</div>
	);
};
