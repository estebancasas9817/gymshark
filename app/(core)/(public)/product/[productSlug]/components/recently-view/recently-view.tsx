'use client';

import { Carousel } from '@/features/carousel';
import { ProductCardContainer } from '@/features/product-card-container';
import {
	RecentlyViewProduct,
	RecentlyViewProducts,
	RecentlyViewProductsSchema,
} from '@/schemas/product.schema';
import { Product, Sku } from '@/types/product';
import { RECENTLY_VIEW_KEY } from '@/utils/local-storage/constants';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { useEffect, useRef, useState } from 'react';

type Products = Product & { sku: Sku; href: string };

export const RecentlyView = ({ productSlug, color }: RecentlyViewProduct) => {
	const params = new URLSearchParams();
	const [recentlyViewedItems, setRecentlyViewedItems] = useState<
		Products[] | null
	>(null);
	const requestRef = useRef<string | null>(null);

	useEffect(() => {
		const requestKey = `${productSlug}-${color}`;

		if (requestRef.current === requestKey) {
			return;
		}
		requestRef.current = requestKey;

		const getRecentlyViewedProducts = async (
			products: RecentlyViewProduct[],
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

		const init = async () => {
			const res =
				getItemsFromLocalStorage<RecentlyViewProducts>(RECENTLY_VIEW_KEY);
			const recentlyViewedProducts = RecentlyViewProductsSchema.safeParse(res);
			if (
				recentlyViewedProducts.success &&
				Array.isArray(recentlyViewedProducts.data)
			) {
				await getRecentlyViewedProducts(recentlyViewedProducts.data);
			}
		};

		init();
	}, [productSlug, color]);

	if (recentlyViewedItems === null) {
		return null;
	}
	const shouldDisplayCarouselButtons = recentlyViewedItems.length > 4;

	return (
		<Carousel
			sectionName="RECENTLY VIEWED"
			className="w-full"
			shouldDisplayCarouselButtons={shouldDisplayCarouselButtons}
		>
			<ProductCardContainer products={recentlyViewedItems} />
		</Carousel>
	);
};
