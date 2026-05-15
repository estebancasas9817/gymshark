'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { QUERY_PARAMS } from './constants';

export const useFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const options = { scroll: false };

	const handleSortBy = (sortBy: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(QUERY_PARAMS.sortBy, sortBy);
		router.push(`?${params.toString()}`, options);
	};

	const handleSize = (size: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const sizeParam = searchParams.get(QUERY_PARAMS.size);
		if (sizeParam === size.toLowerCase()) {
			params.delete(QUERY_PARAMS.size);
		} else {
			params.set(QUERY_PARAMS.size, size.toLowerCase());
		}
		params.set(QUERY_PARAMS.page, '1');
		router.push(`?${params.toString()}`, options);
	};

	const handleColor = (color: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const colorParam = searchParams.get(QUERY_PARAMS.color);
		if (colorParam === color.toLowerCase()) {
			params.delete(QUERY_PARAMS.color);
		} else {
			params.set(QUERY_PARAMS.color, color.toLowerCase());
		}
		params.set(QUERY_PARAMS.page, '1');

		router.push(`?${params.toString()}`, options);
	};

	const handlePrice = (price: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const priceParam = searchParams.get(QUERY_PARAMS.price);
		if (priceParam === price) {
			params.delete(QUERY_PARAMS.price);
		} else {
			params.set(QUERY_PARAMS.price, price);
		}
		params.set(QUERY_PARAMS.page, '1');
		router.push(`?${params.toString()}`, options);
	};

	const handlePagination = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(QUERY_PARAMS.page, page.toString());
		router.push(`?${params.toString()}`);
	};

	const handleClearAllFilters = () => {
		const pageParam = searchParams.get(QUERY_PARAMS.page);
		if (pageParam) {
			router.push(`?page=${pageParam}`, options);
		} else {
			router.push('?', options);
		}
	};

	return {
		handleSortBy,
		handleSize,
		handleColor,
		handlePrice,
		handlePagination,
		handleClearAllFilters,
	};
};
