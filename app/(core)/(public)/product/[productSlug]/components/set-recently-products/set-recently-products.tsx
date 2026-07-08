'use client';

import { RECENTLY_VIEW_KEY } from '@/utils/local-storage/constants';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { setItemsInLocalStorage } from '@/utils/local-storage/set-items';
import { useEffect } from 'react';

interface SetRecentlyProductsProps {
	productSlug: string;
	color: string;
}

export const SetRecentlyProducts = ({
	productSlug,
	color,
}: SetRecentlyProductsProps) => {
	const recentlyViewedProduct = { productSlug, color };

	useEffect(() => {
		const recentlyViewedProducts: SetRecentlyProductsProps[] | null =
			getItemsFromLocalStorage(RECENTLY_VIEW_KEY);
		if (Array.isArray(recentlyViewedProducts)) {
			const isProductAddedInLocalStorage = !!recentlyViewedProducts.find(
				({ productSlug, color }) =>
					productSlug === recentlyViewedProduct.productSlug &&
					color === recentlyViewedProduct.color,
			);
			if (!isProductAddedInLocalStorage) {
				// * IF PRODUCTS DOES NOT EXISTS IN LOCAL STORAGE
				const updatedViewedProducts = recentlyViewedProducts.map(
					(product) => product,
				);
				updatedViewedProducts.unshift(recentlyViewedProduct);
				const filteredProducts = updatedViewedProducts.filter(
					(_, index) => index <= 9,
				);
				setItemsInLocalStorage(RECENTLY_VIEW_KEY, filteredProducts);
			} else {
				// * IF PRODUCTS EXISTS THEN, REMOVE IT FROM THE ARRAY AND ADDED TO THE FIRST POSITION OF THE ARRAY
				const updatedViewedProducts = recentlyViewedProducts.filter(
					({ color, productSlug }) =>
						!(
							color === recentlyViewedProduct.color &&
							productSlug === recentlyViewedProduct.productSlug
						),
				);
				updatedViewedProducts.unshift(recentlyViewedProduct);
				const filteredProducts = updatedViewedProducts.filter(
					(_, index) => index <= 9,
				);
				setItemsInLocalStorage(RECENTLY_VIEW_KEY, filteredProducts);
			}
		}
	}, [recentlyViewedProduct.color, recentlyViewedProduct.productSlug]);
	return null;
};
