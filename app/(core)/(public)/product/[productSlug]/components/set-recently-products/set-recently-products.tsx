'use client';

import {
	RecentlyViewProduct,
	RecentlyViewProducts,
	RecentlyViewProductsSchema,
} from '@/schemas/product.schema';
import { RECENTLY_VIEW_KEY } from '@/utils/local-storage/constants';
import { getItemsFromLocalStorage } from '@/utils/local-storage/get-items';
import { setItemsInLocalStorage } from '@/utils/local-storage/set-items';
import { useEffect } from 'react';

export const SetRecentlyProducts = ({
	productSlug,
	color,
}: RecentlyViewProduct) => {
	const recentlyViewedProduct = { productSlug, color };

	useEffect(() => {
		const res =
			getItemsFromLocalStorage<RecentlyViewProducts>(RECENTLY_VIEW_KEY);
		const recentlyViewedProducts = RecentlyViewProductsSchema.safeParse(res);

		if (
			recentlyViewedProducts.success &&
			Array.isArray(recentlyViewedProducts.data)
		) {
			const isProductAddedInLocalStorage = !!recentlyViewedProducts.data.find(
				({ productSlug, color }) =>
					productSlug === recentlyViewedProduct.productSlug &&
					color === recentlyViewedProduct.color,
			);
			if (!isProductAddedInLocalStorage) {
				// * IF PRODUCTS DOES NOT EXISTS IN LOCAL STORAGE
				const updatedViewedProducts = recentlyViewedProducts.data.map(
					(product) => product,
				);
				updatedViewedProducts.unshift(recentlyViewedProduct);
				const filteredProducts = updatedViewedProducts.filter(
					(_, index) => index <= 9,
				);
				setItemsInLocalStorage(RECENTLY_VIEW_KEY, filteredProducts);
			} else {
				// * IF PRODUCTS EXISTS THEN, REMOVE IT FROM THE ARRAY AND ADDED TO THE FIRST POSITION OF THE ARRAY
				const updatedViewedProducts = recentlyViewedProducts.data.filter(
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
