export const ELLIPSIS = '…' as const;
type PageItem = number | typeof ELLIPSIS;

export function buildPageItems(
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
