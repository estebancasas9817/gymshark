'use client';

import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { RECENTLY_VIEW_KEY } from '@/utils/local-storage/constants';
import { getItemsInLocalStorage } from '@/utils/local-storage/get-items';
import { useEffect, useState } from 'react';

export const RecentlyView = () => {
	const [recentlyViewedItems, setRecentlyViewedItems] = useState(null);

	useEffect(() => {
		setRecentlyViewedItems(
			JSON.parse(getItemsInLocalStorage(RECENTLY_VIEW_KEY) ?? 'null'),
		);
	}, []);

	if (recentlyViewedItems === null) {
		return null;
	}

	return (
		<Carousel sectionName="RECENTLY VIEWED" className="w-full mb-20">
			<ProductCardContainer />
		</Carousel>
	);
};
