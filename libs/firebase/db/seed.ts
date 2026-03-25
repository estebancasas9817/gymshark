import { db } from '@/libs/firebase/firebase';

const products = [
	{
		id: 'w-leggings-1',
		name: 'Adapt Seamless Leggings',
		shortDescription: 'High-waisted seamless leggings',
		longDescription:
			'Designed for performance with a flattering fit and breathable fabric.',
		price: { amount: 65, currency: 'USD' },
		discount: 0,
		categoryId: 'women-leggings',
		variants: [
			{
				color: 'Black',
				sizes: ['XS', 'S', 'M', 'L'],
				images: ['/images/women/leggings/black-1.jpg'],
			},
			{
				color: 'Blue',
				sizes: ['S', 'M', 'L'],
				images: ['/images/women/leggings/blue-1.jpg'],
			},
		],
	},

	{
		id: 'w-leggings-2',
		name: 'Vital Seamless 2.0 Leggings',
		shortDescription: 'Soft and flexible training leggings',
		longDescription: 'Second-skin feel with sweat-wicking fabric.',
		price: { amount: 60, currency: 'USD' },
		discount: 10,
		categoryId: 'women-high-waisted-leggings',
		variants: [
			{
				color: 'Gray',
				sizes: ['XS', 'S', 'M'],
				images: ['/images/women/leggings/gray-1.jpg'],
			},
		],
	},

	{
		id: 'w-tank-1',
		name: 'Training Tank Top',
		shortDescription: 'Lightweight breathable tank',
		longDescription: 'Perfect for high intensity workouts.',
		price: { amount: 30, currency: 'USD' },
		discount: 0,
		categoryId: 'women-tank-tops',
		variants: [
			{
				color: 'White',
				sizes: ['S', 'M', 'L'],
				images: ['/images/women/tanks/white-1.jpg'],
			},
		],
	},

	{
		id: 'w-shorts-1',
		name: 'Flex High Waisted Shorts',
		shortDescription: 'Stretchy and supportive shorts',
		longDescription: 'Ideal for gym and lifestyle wear.',
		price: { amount: 35, currency: 'USD' },
		discount: 0,
		categoryId: 'women-shorts',
		variants: [
			{
				color: 'Black',
				sizes: ['XS', 'S', 'M'],
				images: ['/images/women/shorts/black-1.jpg'],
			},
		],
	},

	{
		id: 'm-shirt-1',
		name: 'Arrival T-Shirt',
		shortDescription: 'Soft cotton training tee',
		longDescription: 'Everyday essential for workouts.',
		price: { amount: 28, currency: 'USD' },
		discount: 0,
		categoryId: 'men-t-shirts-tops',
		variants: [
			{
				color: 'Black',
				sizes: ['S', 'M', 'L', 'XL'],
				images: ['/images/men/tshirts/black-1.jpg'],
			},
		],
	},

	{
		id: 'm-shorts-1',
		name: 'Sport Shorts',
		shortDescription: 'Lightweight training shorts',
		longDescription: 'Designed for movement and comfort.',
		price: { amount: 32, currency: 'USD' },
		discount: 0,
		categoryId: 'men-shorts',
		variants: [
			{
				color: 'Navy',
				sizes: ['M', 'L', 'XL'],
				images: ['/images/men/shorts/navy-1.jpg'],
			},
		],
	},

	{
		id: 'm-hoodie-1',
		name: 'Power Hoodie',
		shortDescription: 'Warm and comfortable hoodie',
		longDescription: 'Perfect for pre and post workout.',
		price: { amount: 70, currency: 'USD' },
		discount: 15,
		categoryId: 'men-hoodies',
		variants: [
			{
				color: 'Gray',
				sizes: ['S', 'M', 'L'],
				images: ['/images/men/hoodies/gray-1.jpg'],
			},
		],
	},

	{
		id: 'acc-bag-1',
		name: 'Gym Duffle Bag',
		shortDescription: 'Spacious training bag',
		longDescription: 'Carry all your gym essentials.',
		price: { amount: 55, currency: 'USD' },
		discount: 0,
		categoryId: 'accessories-bags',
		variants: [
			{
				color: 'Black',
				sizes: ['One Size'],
				images: ['/images/accessories/bags/black-1.jpg'],
			},
		],
	},

	{
		id: 'acc-socks-1',
		name: 'Training Socks 3 Pack',
		shortDescription: 'Comfortable gym socks',
		longDescription: 'Breathable and durable.',
		price: { amount: 15, currency: 'USD' },
		discount: 0,
		categoryId: 'accessories-socks',
		variants: [
			{
				color: 'White',
				sizes: ['S', 'M', 'L'],
				images: ['/images/accessories/socks/white-1.jpg'],
			},
		],
	},
];

export const seedCategories = async () => {
	try {
		await Promise.all(
			products.map((product) =>
				db.collection('products').doc(product.id).set(product),
			),
		);

		console.log('✅ Categories seeded');
	} catch (error) {
		console.error('❌ Error seeding categories', error);
	}
};
