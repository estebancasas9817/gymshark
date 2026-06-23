import { CartItem } from '@/types/cart';
import { db } from '../../init-firestore';
import { Product, Sku } from '@/types/product';
import { unstable_cache } from 'next/cache';

export type CartItemFull = {
	productId: string;
	skuId: string;
	quantity: number;
	name: string;
	price: number;
	image: string;
	color: string;
	size: string;
	discount?: number;
	sizes?: { size: string; stock: number }[];
};

export const getCart = (userId: string): Promise<CartItemFull[]> => {
	return unstable_cache(
		async () => {
			const cartSnap = await db.collection('carts').doc(userId).get();
			if (!cartSnap.exists) return [];
			const { items } = cartSnap.data() as {
				items: CartItem[];
			};
			const promises = items.map((item) =>
				db.collection('products').doc(item.productId).get(),
			);
			const productsSnap = await Promise.all(promises);
			if (!productsSnap.length) {
				return [];
			}
			const productIds = productsSnap.map((product) => product.id);
			let skusSnap = await db
				.collectionGroup('skus')
				.where('productId', 'in', productIds)
				.get();

			if (skusSnap.empty) {
				return [];
			}
			const skusByProductId = skusSnap.docs.reduce(
				(acc, doc) => {
					const sku = { id: doc.id, ...doc.data() } as Sku;
					if (!acc[sku.productId]) {
						acc[sku.productId] = [];
					}
					acc[sku.productId].push(sku);
					return acc;
				},
				{} as Record<string, Sku[]>,
			);
			const filteredSkus: Sku[] = [];
			items.forEach((item) => {
				const filteredSku = skusByProductId[item.productId].find(
					(sku) => sku.id === item.skuId,
				);
				if (filteredSku) {
					filteredSkus.push(filteredSku);
				}
			});
			const products = productsSnap.map((doc) => ({
				id: doc.id,
				...(doc.data() as Omit<Product, 'id'>),
			}));
			const productsById = products.reduce(
				(acc, product) => {
					acc[product.id] = product;
					return acc;
				},
				{} as Record<string, Product>,
			);
			const skusById = filteredSkus.reduce(
				(acc, sku) => {
					acc[sku.id] = sku;
					return acc;
				},
				{} as Record<string, Sku>,
			);
			const cartItems = items.map((item) => ({
				...item,
				name: productsById[item.productId].name,
				price: productsById[item.productId].basePrice,
				image: skusById[item.skuId].images[0],
				color: skusById[item.skuId].color,
				sizes: skusById[item.skuId].sizes,
			}));
			return cartItems;
		},
		['cart', userId],
		{ tags: [`cart-${userId}`] },
	)();
};
