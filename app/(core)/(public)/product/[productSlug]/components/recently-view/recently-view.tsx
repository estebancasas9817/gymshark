'use client';

import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import { Product, Sku } from '@/types/product';
import { RECENTLY_VIEW_KEY } from '@/utils/local-storage/constants';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { useEffect, useState } from 'react';

type RecentlyViewProducts = {
	productSlug: string;
	color: string;
};
type Products = Product & { sku: Sku; href: string };

export const RecentlyView = ({ productSlug, color }: RecentlyViewProducts) => {
	const params = new URLSearchParams();
	const [recentlyViewedItems, setRecentlyViewedItems] = useState<
		Products[] | null
	>(null);

	useEffect(() => {
		const getRecentlyViewedProducts = async (
			products: RecentlyViewProducts[],
		) => {
			products.forEach(({ color, productSlug }) => {
				params.append('color', color);
				params.append('productSlug', productSlug);
			});
			const res = await fetch(`/api/recently-viewed?${params}`);
			const { success, data }: { success: boolean; data: Products[] } =
				await res.json();
			if (success) {
				setRecentlyViewedItems(data);
			}
		};
		const recentlyViewedProducts: RecentlyViewProducts[] | null =
			getItemsFromLocalStorage(RECENTLY_VIEW_KEY);
		if (Array.isArray(recentlyViewedProducts)) {
			getRecentlyViewedProducts(recentlyViewedProducts);
		}
	}, [productSlug, color]);

	if (recentlyViewedItems === null) {
		return null;
	}
	const shouldDisplayCarouselButtons = recentlyViewedItems.length > 4;

	return (
		<Carousel
			sectionName="RECENTLY VIEWED"
			className="w-full mb-20"
			shouldDisplayCarouselButtons={shouldDisplayCarouselButtons}
		>
			<ProductCardContainer products={recentlyViewedItems} />
		</Carousel>
	);
};
