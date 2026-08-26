'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilter } from '../../hooks/use-filter';
import { buildPageItems, ELLIPSIS } from './utils';

export interface PaginatorProps {
	totalPages: number;
	currentPage: number;
	siblingCount?: number;
	className?: string;
}

const cell =
	'inline-flex items-center justify-center size-9 rounded-lg text-sm select-none ' +
	'transition-colors duration-100 ' +
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30';

const cellActive =
	'!bg-white !border-white !text-[#383838] font-semibold cursor-default pointer-events-none';

const cellDefault =
	'text-[#444] hover:bg-[#111] hover:border-[#484848] hover:text-white cursor-pointer';

const cellDisabled = 'text-[#aaa] cursor-not-allowed pointer-events-none';

export function ProductListPaginator({
	totalPages,
	currentPage,
	siblingCount = 1,
	className = '',
}: PaginatorProps) {
	const { handlePagination } = useFilter();

	if (totalPages <= 1) return null;

	const items = buildPageItems(currentPage, totalPages, siblingCount);
	const hasPrev = currentPage > 1;
	const hasNext = currentPage < totalPages;

	const onPageChange = (page: number) => {
		handlePagination(page);
	};

	return (
		<nav
			role="navigation"
			aria-label="Pagination"
			className={`flex gap-1.5 self-center mb-8 ${className}`}
		>
			{hasPrev ? (
				<button
					aria-label="Previous page"
					className={`${cell} ${cellDefault}`}
					onClick={() => onPageChange(currentPage - 1)}
				>
					<ChevronLeft size={20} />
				</button>
			) : (
				<span
					aria-disabled="true"
					aria-label="Previous page"
					className={`${cell} ${cellDisabled}`}
				>
					<ChevronLeft size={20} />
				</span>
			)}

			{items.map((item, i) =>
				item === ELLIPSIS ? (
					<span
						key={`e-${i}`}
						aria-hidden="true"
						className="inline-flex size-9 items-center justify-center text-sm text-[#555]"
					>
						{ELLIPSIS}
					</span>
				) : (
					<button
						key={item}
						aria-label={`Page ${item}`}
						aria-current={item === currentPage ? 'page' : undefined}
						onClick={() => onPageChange?.(item)}
						className={`${cell} ${item === currentPage ? cellActive : cellDefault}`}
					>
						{item}
					</button>
				),
			)}

			{hasNext ? (
				<button
					aria-label="Next page"
					className={`${cell} ${cellDefault}`}
					onClick={() => onPageChange(currentPage + 1)}
				>
					<ChevronRight size={20} />
				</button>
			) : (
				<span
					aria-disabled="true"
					aria-label="Next page"
					className={`${cell} ${cellDisabled}`}
				>
					<ChevronRight size={20} />
				</span>
			)}
		</nav>
	);
}
