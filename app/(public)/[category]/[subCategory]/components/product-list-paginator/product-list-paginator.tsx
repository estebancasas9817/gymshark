'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginatorProps {
	totalPages: number;
	currentPage: number;
	searchParam?: string;
	siblingCount?: number;
	onPageChange?: (page: number) => void;
	className?: string;
}

const ELLIPSIS = '…' as const;
type PageItem = number | typeof ELLIPSIS;

function buildPageItems(
	currentPage: number,
	totalPages: number,
	siblingCount: number,
): PageItem[] {
	const rangeStart = Math.max(2, currentPage - siblingCount);
	const rangeEnd = Math.min(totalPages - 1, currentPage + siblingCount);

	const items: PageItem[] = [1];
	if (rangeStart > 2) items.push(ELLIPSIS);
	for (let i = rangeStart; i <= rangeEnd; i++) items.push(i);
	if (rangeEnd < totalPages - 1) items.push(ELLIPSIS);
	if (totalPages > 1) items.push(totalPages);

	return items;
}

function buildHref(
	pathname: string,
	searchParams: URLSearchParams,
	searchParam: string,
	page: number,
): string {
	const params = new URLSearchParams(searchParams.toString());
	if (page === 1) {
		params.delete(searchParam);
	} else {
		params.set(searchParam, String(page));
	}
	const query = params.toString();
	return query ? `${pathname}?${query}` : pathname;
}

const cell =
	'inline-flex items-center justify-center size-9 rounded-lg text-sm select-none ' +
	'transition-colors duration-100 ' +
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30';

// Active page: solid white fill, dark label
const cellActive =
	'!bg-white !border-white !text-[#383838] font-semibold cursor-default pointer-events-none';

// Default page: muted, brightens on hover
const cellDefault =
	'text-[#444] hover:bg-[#111] hover:border-[#484848] hover:text-white cursor-pointer';
// 111
// Disabled arrow: barely visible
const cellDisabled = 'text-[#aaa] cursor-not-allowed pointer-events-none';

// ─── Paginator ────────────────────────────────────────────────────────────────

export function ProductListPaginator({
	totalPages,
	currentPage,
	searchParam = 'page',
	siblingCount = 1,
	onPageChange,
	className = '',
}: PaginatorProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const href = useCallback(
		(page: number) => buildHref(pathname, searchParams, searchParam, page),
		[pathname, searchParams, searchParam],
	);

	if (totalPages <= 1) return null;

	const items = buildPageItems(currentPage, totalPages, siblingCount);
	const hasPrev = currentPage > 1;
	const hasNext = currentPage < totalPages;

	return (
		<nav
			role="navigation"
			aria-label="Pagination"
			className={`flex gap-1.5 self-center mb-8 ${className}`}
		>
			{hasPrev ? (
				<Link
					href={href(currentPage - 1)}
					aria-label="Previous page"
					className={`${cell} ${cellDefault}`}
				>
					<ChevronLeft size={20} />
				</Link>
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
					<Link
						key={item}
						href={href(item)}
						aria-label={`Page ${item}`}
						aria-current={item === currentPage ? 'page' : undefined}
						onClick={() => onPageChange?.(item)}
						className={`${cell} ${item === currentPage ? cellActive : cellDefault}`}
					>
						{item}
					</Link>
				),
			)}

			{hasNext ? (
				<Link
					href={href(currentPage + 1)}
					aria-label="Next page"
					className={`${cell} ${cellDefault}`}
				>
					<ChevronRight size={20} />
				</Link>
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
