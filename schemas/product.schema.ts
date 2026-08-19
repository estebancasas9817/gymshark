import z from 'zod';

export const RecentlyViewProductSchema = z.object({
	productSlug: z.string().trim(),
	color: z.string().trim(),
});
export const RecentlyViewProductsSchema = z
	.array(RecentlyViewProductSchema)
	.nullish();
export type RecentlyViewProduct = z.infer<typeof RecentlyViewProductSchema>;
export type RecentlyViewProducts = z.infer<typeof RecentlyViewProductsSchema>;
