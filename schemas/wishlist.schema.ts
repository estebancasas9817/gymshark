import z from 'zod';
import { CartItemFullSchema } from './cart.schema';

export const WishlistItemFullSchema = CartItemFullSchema.omit({
	quantity: true,
	size: true,
});
const GetWishlistSuccessSchema = z.object({
	data: z.array(WishlistItemFullSchema).default([]),
	status: z.literal('SUCCESS'),
	success: z.boolean(),
});
const GetWishlistUnauthorizedSchema = z.object({
	status: z.literal('UNAUTHORIZED'),
	success: z.boolean(),
	error: z.string(),
});
const GetWishlistUnexpectedErrorSchema = z.object({
	status: z.literal('UNEXPECTED_ERROR'),
	success: z.boolean(),
	error: z.string(),
});

export const GetWishlistSchema = z.discriminatedUnion('status', [
	GetWishlistSuccessSchema,
	GetWishlistUnauthorizedSchema,
	GetWishlistUnexpectedErrorSchema,
]);
export const WishlistItemFullArraySchema = z.array(WishlistItemFullSchema);

export type WishlistItemFull = z.infer<typeof WishlistItemFullSchema>;
export type WishlistItemsFull = z.infer<typeof WishlistItemFullArraySchema>;
