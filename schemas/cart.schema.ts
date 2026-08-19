import z from 'zod';

export const CartSizesSchema = z.object({
	size: z.string(),
	stock: z.number(),
});
export const CartItemFullSchema = z.object({
	productId: z.string(),
	skuId: z.string(),
	quantity: z.number(),
	name: z.string(),
	price: z.number(),
	image: z.string(),
	color: z.string(),
	size: z.string(),
	discount: z.number().optional(),
	sizes: z.array(CartSizesSchema).optional(),
});
export const CartItemFullArraySchema = z.array(CartItemFullSchema);

const GetCartSuccessSchema = z.object({
	data: z.array(CartItemFullSchema).default([]),
	status: z.literal('SUCCESS'),
	success: z.boolean(),
});
const GetCartUnauthorizedSchema = z.object({
	status: z.literal('UNAUTHORIZED'),
	success: z.boolean(),
	error: z.string(),
});
const GetCartUnexpectedErrorSchema = z.object({
	status: z.literal('UNEXPECTED_ERROR'),
	success: z.boolean(),
	error: z.string(),
});

export const GetCartSchema = z.discriminatedUnion('status', [
	GetCartSuccessSchema,
	GetCartUnauthorizedSchema,
	GetCartUnexpectedErrorSchema,
]);
export type CartItemsFull = z.infer<typeof CartItemFullArraySchema>;
export type CartItemFull = z.infer<typeof CartItemFullSchema>;
