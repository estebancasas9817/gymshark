'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useCarousel = (childrenToShow: 'xs' | 'sm' | 'md') => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [scroll, setScroll] = useState({
		isScrollLeftMax: true,
		isScrollRightMax: false,
	});
	const pathName = usePathname();
	let maxItems = 4;
	if (childrenToShow === 'xs') {
		maxItems = 3;
	} else if (childrenToShow === 'md') {
		maxItems = 5;
	}

	const handleScroll = useCallback(() => {
		if (ref.current) {
			const scrollMax = ref.current.scrollWidth - ref.current.clientWidth;
			const scrollMin = 0;
			const scrollLeft = ref.current.scrollLeft;
			const isScrollRightMax = scrollMax === scrollLeft;
			const isScrollLeftMax = scrollMin === scrollLeft;
			setScroll((prevState) => {
				return { ...prevState, isScrollLeftMax, isScrollRightMax };
			});
		}
	}, []);

	const handleClickChevron = useCallback((direction: 'left' | 'right') => {
		if (ref.current) {
			const clientWidth = ref.current.clientWidth;
			const scrollStep = clientWidth / maxItems;
			const scrollLeft =
				direction === 'left'
					? ref.current.scrollLeft - scrollStep
					: ref.current.scrollLeft + scrollStep;
			ref.current.scrollLeft = scrollLeft;
		}
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollLeft = 0;
		}
	}, [pathName]);

	return { handleScroll, handleClickChevron, scroll, ref };
};
