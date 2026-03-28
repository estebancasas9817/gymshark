import { db } from '@/libs/firebase/firebase';

export const productsSeedBatch2 = [
	// WOMEN — LEGGINGS
	{
		id: 'wlg-06',
		name: 'High Rise Sculpt Leggings',
		shortDescription: 'Sculpting high-rise leggings.',
		longDescription:
			'Compression fabric with contour seams for a sculpted look.',
		price: 289000,
		currency: 'COP',
		categoryId: 'women-high-waisted-leggings',
		parentCategoryId: 'women-leggings',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/women/leggings/black-sculpt.jpg'],
				sizes: [
					{ size: 'S', stock: 8 },
					{ size: 'M', stock: 10 },
				],
			},
		],
	},
	{
		id: 'wlg-07',
		name: 'Scrunch Seamless Leggings',
		shortDescription: 'Scrunch detail for glute contour.',
		longDescription:
			'Seamless fabric with scrunch seam to enhance glute shape.',
		price: 299000,
		currency: 'COP',
		categoryId: 'women-scrunch-leggings',
		parentCategoryId: 'women-leggings',
		variants: [
			{
				id: 'wine',
				color: 'Wine',
				images: ['/img/women/leggings/wine-scrunch.jpg'],
				sizes: [
					{ size: 'S', stock: 5 },
					{ size: 'M', stock: 7 },
				],
			},
		],
	},

	// WOMEN — SHORTS
	{
		id: 'wsh-01',
		name: 'Training Shorts Pro',
		shortDescription: 'Lightweight shorts for high intensity.',
		longDescription:
			'Breathable stretch shorts with inner lining and zip pocket.',
		price: 179000,
		currency: 'COP',
		categoryId: 'women-shorts',
		parentCategoryId: 'women-shorts',
		variants: [
			{
				id: 'gray',
				color: 'Gray',
				images: ['/img/women/shorts/gray.jpg'],
				sizes: [
					{ size: 'S', stock: 12 },
					{ size: 'M', stock: 9 },
				],
			},
		],
	},

	// WOMEN — TANK TOPS
	{
		id: 'wtt-01',
		name: 'Breathable Training Tank',
		shortDescription: 'Airy tank for tough sessions.',
		longDescription: 'Ultra-light tank with sweat-wicking technology.',
		price: 119000,
		currency: 'COP',
		categoryId: 'women-tank-tops',
		parentCategoryId: 'women-tank-tops',
		variants: [
			{
				id: 'mint',
				color: 'Mint',
				images: ['/img/women/tanks/mint.jpg'],
				sizes: [
					{ size: 'S', stock: 15 },
					{ size: 'M', stock: 11 },
				],
			},
		],
	},

	// WOMEN — LONG SLEEVES
	{
		id: 'wls-01',
		name: 'Seamless Long Sleeve Top',
		shortDescription: 'Seamless comfort with stretch.',
		longDescription: 'Form-fitting seamless top ideal for cool training days.',
		price: 199000,
		currency: 'COP',
		categoryId: 'women-long-sleeves',
		parentCategoryId: 'women-long-sleeves',
		variants: [
			{
				id: 'lavender',
				color: 'Lavender',
				images: ['/img/women/longsleeve/lavender.jpg'],
				sizes: [
					{ size: 'S', stock: 9 },
					{ size: 'M', stock: 6 },
				],
			},
		],
	},

	// WOMEN — JACKETS
	{
		id: 'wjk-01',
		name: 'Lightweight Training Jacket',
		shortDescription: 'Windbreaker for outdoor sessions.',
		longDescription: 'Featherlight jacket with mesh ventilation panels.',
		price: 259000,
		currency: 'COP',
		categoryId: 'women-jackets',
		parentCategoryId: 'women-jackets',
		variants: [
			{
				id: 'olive',
				color: 'Olive',
				images: ['/img/women/jackets/olive.jpg'],
				sizes: [
					{ size: 'S', stock: 7 },
					{ size: 'M', stock: 5 },
				],
			},
		],
	},

	// MEN — TSHIRTS
	{
		id: 'mts-01',
		name: 'Essential Training Tee',
		shortDescription: 'Everyday performance t-shirt.',
		longDescription: 'Soft stretch cotton blend for gym and lifestyle.',
		price: 129000,
		currency: 'COP',
		categoryId: 'men-t-shirts-tops',
		parentCategoryId: 'men-t-shirts-tops',
		variants: [
			{
				id: 'sand',
				color: 'Sand',
				images: ['/img/men/tees/sand.jpg'],
				sizes: [
					{ size: 'M', stock: 14 },
					{ size: 'L', stock: 12 },
				],
			},
		],
	},

	// MEN — SHORTS
	{
		id: 'msh-01',
		name: 'Performance Training Shorts',
		shortDescription: 'Stretch shorts with airflow.',
		longDescription: 'Lightweight shorts with laser-cut ventilation.',
		price: 169000,
		currency: 'COP',
		categoryId: 'men-shorts',
		parentCategoryId: 'men-shorts',
		variants: [
			{
				id: 'navy',
				color: 'Navy',
				images: ['/img/men/shorts/navy.jpg'],
				sizes: [
					{ size: 'M', stock: 10 },
					{ size: 'L', stock: 8 },
				],
			},
		],
	},

	// MEN — HOODIES
	{
		id: 'mhd-01',
		name: 'Core Hoodie',
		shortDescription: 'Warmup hoodie with soft lining.',
		longDescription: 'Brushed fleece interior with relaxed athletic fit.',
		price: 249000,
		currency: 'COP',
		categoryId: 'men-hoodies',
		parentCategoryId: 'men-hoodies',
		variants: [
			{
				id: 'charcoal',
				color: 'Charcoal',
				images: ['/img/men/hoodies/charcoal.jpg'],
				sizes: [
					{ size: 'M', stock: 9 },
					{ size: 'L', stock: 6 },
				],
			},
		],
	},

	// MEN — JACKETS
	{
		id: 'mjk-01',
		name: 'Training Shell Jacket',
		shortDescription: 'Water resistant shell.',
		longDescription: 'Windproof outer layer ideal for outdoor training.',
		price: 279000,
		currency: 'COP',
		categoryId: 'men-jackets',
		parentCategoryId: 'men-jackets',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/men/jackets/black.jpg'],
				sizes: [
					{ size: 'M', stock: 6 },
					{ size: 'L', stock: 4 },
				],
			},
		],
	},

	// MEN — SWIMWEAR
	{
		id: 'msw-01',
		name: 'Performance Swim Shorts',
		shortDescription: 'Quick dry swim shorts.',
		longDescription: 'Elastic waist, mesh lining and quick-dry fabric.',
		price: 139000,
		currency: 'COP',
		categoryId: 'men-swimwear',
		parentCategoryId: 'men-swimwear',
		variants: [
			{
				id: 'aqua',
				color: 'Aqua',
				images: ['/img/men/swim/aqua.jpg'],
				sizes: [
					{ size: 'M', stock: 11 },
					{ size: 'L', stock: 7 },
				],
			},
		],
	},

	// ACCESSORIES — BAGS
	{
		id: 'bag-01',
		name: 'Training Duffel Bag',
		shortDescription: 'Spacious duffel for gym gear.',
		longDescription: 'Multiple compartments and reinforced straps.',
		price: 199000,
		currency: 'COP',
		categoryId: 'accessories-bags',
		parentCategoryId: 'accessories-bags',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/accessories/bag-black.jpg'],
				sizes: [{ size: 'One Size', stock: 25 }],
			},
		],
	},

	// ACCESSORIES — EQUIPMENT
	{
		id: 'eqp-01',
		name: 'Lifting Straps Pro',
		shortDescription: 'Heavy duty lifting straps.',
		longDescription: 'Cotton straps with reinforced stitching for heavy lifts.',
		price: 59000,
		currency: 'COP',
		categoryId: 'accessories-straps',
		parentCategoryId: 'accessories-straps',
		variants: [
			{
				id: 'default',
				color: 'Black',
				images: ['/img/accessories/straps.jpg'],
				sizes: [{ size: 'One Size', stock: 50 }],
			},
		],
	},
];
const algo = [
	{
		id: 'aqua-red',
		color: 'Red',
		sizes: [
			{ size: 'M', insStock: true, stock: 11 },
			{ size: 'S', insStock: true, stock: 2 },
			{ size: 'L', insStock: false, stock: 0 },
		],
		images: ['/img/men/swim/aqua-red.jpg'],
	},
	{
		id: 'aqua-blue',
		color: 'Blue',
		sizes: [
			{ size: 'M', insStock: true, stock: 15 },
			{ size: 'S', insStock: false, stock: 0 },
			{ size: 'L', insStock: true, stock: 1 },
		],
		images: ['/img/men/swim/aqua-blue.jpg'],
	},
];

const products = [
	{
		id: 'bag-01',
		name: 'Training Duffel Bag',
		shortDescription: 'Spacious duffel for gym gear.',
		longDescription: 'Multiple compartments and reinforced straps.',
		price: 199000,
		currency: 'COP',
		categoryId: 'accessories-bags',
		parentCategoryId: 'accessories-bags',
		variants: [
			{
				color: 'Black',
				id: 'black',
				images: ['/img/accessories/bag-black.jpg'],
				sized: [
					{
						size: 'S',
						inStock: true,
						stock: 10,
					},
				],
			},
		],
	},
	{
		id: 'eqp-01',
		name: 'Lifting Straps Pro',
		shortDescription: 'Heavy duty lifting straps.',
		longDescription: 'Cotton straps with reinforced stitching for heavy lifts.',
		price: 59000,
		currency: 'COP',
		categoryId: 'accessories-straps',
		parentCategoryId: 'accessories-straps',
		variants: [
			{
				id: 'default',
				color: 'Black',
				images: ['/img/accessories/straps.jpg'],
				sizes: [
					{
						size: 'One Size',
						stock: 50,
					},
				],
			},
		],
	},
	{
		id: 'mhd-01',
		name: 'Core Hoodie',
		shortDescription: 'Warmup hoodie with soft lining.',
		longDescription: 'Brushed fleece interior with relaxed athletic fit.',
		price: 249000,
		currency: 'COP',
		categoryId: 'men-hoodies',
		parentCategoryId: 'men-hoodies',
		variants: [
			{
				id: 'charcoal',
				color: 'Charcoal',
				images: ['/img/men/hoodies/charcoal.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 9,
					},
					{
						size: 'L',
						stock: 6,
					},
				],
			},
		],
	},
	{
		id: 'mjk-01',
		name: 'Training Shell Jacket',
		shortDescription: 'Water resistant shell.',
		longDescription: 'Windproof outer layer ideal for outdoor training.',
		price: 279000,
		currency: 'COP',
		categoryId: 'men-jackets',
		parentCategoryId: 'men-jackets',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/men/jackets/black.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 6,
					},
					{
						size: 'L',
						stock: 4,
					},
				],
			},
		],
	},
	{
		id: 'msh-01',
		name: 'Performance Training Shorts',
		shortDescription: 'Stretch shorts with airflow.',
		longDescription: 'Lightweight shorts with laser-cut ventilation.',
		price: 169000,
		currency: 'COP',
		categoryId: 'men-shorts',
		parentCategoryId: 'men-shorts',
		variants: [
			{
				id: 'navy',
				color: 'Navy',
				images: ['/img/men/shorts/navy.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 10,
					},
					{
						size: 'L',
						stock: 8,
					},
				],
			},
		],
	},
	{
		id: 'msh-shorts-01',
		name: 'Sport Shorts',
		shortDescription: 'Performance shorts with stretch.',
		longDescription:
			'Elastic waistband, lightweight fabric and side pockets for gym essentials.',
		price: 179000,
		currency: 'COP',
		categoryId: 'men-shorts',
		parentCategoryId: 'men-shorts',
		variants: [
			{
				id: 'olive',
				color: 'Olive',
				images: ['/img/men/shorts/olive-1.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 11,
					},
					{
						size: 'L',
						stock: 6,
					},
				],
			},
		],
	},
	{
		id: 'msw-01',
		name: 'Performance Swim Shorts',
		shortDescription: 'Quick dry swim shorts.',
		longDescription: 'Elastic waist, mesh lining and quick-dry fabric.',
		price: 139000,
		currency: 'COP',
		categoryId: 'men-swimwear',
		parentCategoryId: 'men-swimwear',
		variants: [
			{
				id: 'aqua',
				color: 'Aqua',
				images: ['/img/men/swim/aqua.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 11,
					},
					{
						size: 'L',
						stock: 7,
					},
				],
			},
		],
	},
	{
		id: 'mts-01',
		name: 'Essential Training Tee',
		shortDescription: 'Everyday performance t-shirt.',
		longDescription: 'Soft stretch cotton blend for gym and lifestyle.',
		price: 129000,
		currency: 'COP',
		categoryId: 'men-t-shirts-tops',
		parentCategoryId: 'men-t-shirts-tops',
		variants: [
			{
				id: 'sand',
				color: 'Sand',
				images: ['/img/men/tees/sand.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 14,
					},
					{
						size: 'L',
						stock: 12,
					},
				],
			},
		],
	},
	{
		id: 'mts-tee-01',
		name: 'Arrival T-Shirt',
		shortDescription: 'Classic gym tee with athletic cut.',
		longDescription:
			'Soft cotton blend with tapered sleeves and minimal branding.',
		price: 149000,
		currency: 'COP',
		categoryId: 'men-t-shirts-tops',
		parentCategoryId: 'men-t-shirts-tops',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/men/tees/black-1.jpg'],
				sizes: [
					{
						size: 'M',
						stock: 14,
					},
					{
						size: 'L',
						stock: 8,
					},
				],
			},
		],
	},
	{
		id: 'wjk-01',
		name: 'Lightweight Training Jacket',
		shortDescription: 'Windbreaker for outdoor sessions.',
		longDescription: 'Featherlight jacket with mesh ventilation panels.',
		price: 259000,
		currency: 'COP',
		categoryId: 'women-jackets',
		parentCategoryId: 'women-jackets',
		variants: [
			{
				id: 'olive',
				color: 'Olive',
				images: ['/img/women/jackets/olive.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 7,
					},
					{
						size: 'M',
						stock: 5,
					},
				],
			},
		],
	},
	{
		id: 'wkf-leggings-01',
		name: 'Flex High-Waist Leggings',
		shortDescription: 'Sculpting high-rise leggings with compressive fit.',
		longDescription:
			'Designed for training and everyday wear. High-waisted support with sweat-wicking fabric and flattering seams.',
		price: 289000,
		currency: 'COP',
		discount: 10,
		categoryId: 'women-high-waisted-leggings',
		parentCategoryId: 'women-leggings',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/women/leggings/black-1.jpg'],
				sizes: [
					{
						size: 'XS',
						stock: 8,
					},
					{
						size: 'S',
						stock: 12,
					},
					{
						size: 'M',
						stock: 5,
					},
				],
			},
			{
				id: 'navy',
				color: 'Navy',
				images: ['/img/women/leggings/navy-1.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 6,
					},
					{
						size: 'M',
						stock: 10,
					},
				],
			},
		],
	},
	{
		id: 'wlg-06',
		name: 'High Rise Sculpt Leggings',
		shortDescription: 'Sculpting high-rise leggings.',
		longDescription:
			'Compression fabric with contour seams for a sculpted look.',
		price: 289000,
		currency: 'COP',
		categoryId: 'women-high-waisted-leggings',
		parentCategoryId: 'women-leggings',
		variants: [
			{
				id: 'black',
				color: 'Black',
				images: ['/img/women/leggings/black-sculpt.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 8,
					},
					{
						size: 'M',
						stock: 10,
					},
				],
			},
		],
	},
	{
		id: 'wlg-07',
		name: 'Scrunch Seamless Leggings',
		shortDescription: 'Scrunch detail for glute contour.',
		longDescription:
			'Seamless fabric with scrunch seam to enhance glute shape.',
		price: 299000,
		currency: 'COP',
		categoryId: 'women-scrunch-leggings',
		parentCategoryId: 'women-leggings',
		variants: [
			{
				id: 'wine',
				color: 'Wine',
				images: ['/img/women/leggings/wine-scrunch.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 5,
					},
					{
						size: 'M',
						stock: 7,
					},
				],
			},
		],
	},
	{
		id: 'wls-01',
		name: 'Seamless Long Sleeve Top',
		shortDescription: 'Seamless comfort with stretch.',
		longDescription: 'Form-fitting seamless top ideal for cool training days.',
		price: 199000,
		currency: 'COP',
		categoryId: 'women-long-sleeves',
		parentCategoryId: 'women-long-sleeves',
		variants: [
			{
				id: 'lavender',
				color: 'Lavender',
				images: ['/img/women/longsleeve/lavender.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 9,
					},
					{
						size: 'M',
						stock: 6,
					},
				],
			},
		],
	},
	{
		id: 'wsc-leggings-02',
		name: 'Scrunch Seamless Leggings',
		shortDescription: 'Seamless leggings with scrunch detail.',
		longDescription:
			'Contour shading and scrunch seam enhance your shape. Seamless comfort for intense sessions.',
		price: 269000,
		currency: 'COP',
		categoryId: 'women-scrunch-leggings',
		parentCategoryId: 'women-leggings',
		variants: [
			{
				id: 'burgundy',
				color: 'Burgundy',
				images: ['/img/women/leggings/burgundy-1.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 9,
					},
					{
						size: 'M',
						stock: 7,
					},
				],
			},
		],
	},
	{
		id: 'wsh-01',
		name: 'Training Shorts Pro',
		shortDescription: 'Lightweight shorts for high intensity.',
		longDescription:
			'Breathable stretch shorts with inner lining and zip pocket.',
		price: 179000,
		currency: 'COP',
		categoryId: 'women-shorts',
		parentCategoryId: 'women-shorts',
		variants: [
			{
				id: 'gray',
				color: 'Gray',
				images: ['/img/women/shorts/gray.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 12,
					},
					{
						size: 'M',
						stock: 9,
					},
				],
			},
		],
	},
	{
		id: 'wsh-shorts-01',
		name: 'Training Shorts',
		shortDescription: 'Lightweight shorts for high intensity.',
		longDescription:
			'Breathable fabric with stretch and minimal seams for total freedom of movement.',
		price: 189000,
		currency: 'COP',
		categoryId: 'women-shorts',
		parentCategoryId: 'women-shorts',
		variants: [
			{
				id: 'gray',
				color: 'Gray',
				images: ['/img/women/shorts/gray-1.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 10,
					},
					{
						size: 'M',
						stock: 6,
					},
				],
			},
		],
	},
	{
		id: 'wtk-tank-01',
		name: 'Essential Tank',
		shortDescription: 'Soft stretch tank for training.',
		longDescription:
			'Slim fit tank with breathable cotton blend for gym and casual wear.',
		price: 129000,
		currency: 'COP',
		categoryId: 'women-tank-tops',
		parentCategoryId: 'women-tank-tops',
		variants: [
			{
				id: 'white',
				color: 'White',
				images: ['/img/women/tanks/white-1.jpg'],
				sizes: [
					{
						size: 'XS',
						stock: 4,
					},
					{
						size: 'S',
						stock: 9,
					},
				],
			},
		],
	},
	{
		id: 'wtt-01',
		name: 'Breathable Training Tank',
		shortDescription: 'Airy tank for tough sessions.',
		longDescription: 'Ultra-light tank with sweat-wicking technology.',
		price: 119000,
		currency: 'COP',
		categoryId: 'women-tank-tops',
		parentCategoryId: 'women-tank-tops',
		variants: [
			{
				id: 'mint',
				color: 'Mint',
				images: ['/img/women/tanks/mint.jpg'],
				sizes: [
					{
						size: 'S',
						stock: 15,
					},
					{
						size: 'M',
						stock: 11,
					},
				],
			},
		],
	},
];

type Variant = {
	id: string;
	color: string;
	sizes: { size: string; inStock: boolean; stock: number }[];
	images: string[];
};

const sizesClothes = [
	{ size: 'S', inStock: true, stock: 10 },
	{ size: 'M', inStock: true, stock: 12 },
	{ size: 'L', inStock: true, stock: 8 },
];

const sizesLeggings = [
	{ size: 'XS', inStock: true, stock: 6 },
	{ size: 'S', inStock: true, stock: 10 },
	{ size: 'M', inStock: true, stock: 7 },
];

const oneSize = [{ size: 'One Size', inStock: true, stock: 25 }];

const makeVariants = (
	id: string,
	basePath: string,
	colors: string[],
	sizes: any,
): Variant[] =>
	colors.map((c) => ({
		id: `${id}-${c.toLowerCase()}`,
		color: c,
		images: [`${basePath}/${c.toLowerCase()}.jpg`],
		sizes,
	}));

const productsSeed = [
	{
		id: 'bag-01',
		name: 'Training Duffel Bag',
		shortDescription: 'Spacious duffel for gym gear.',
		longDescription: 'Multiple compartments and reinforced straps.',
		price: 199000,
		currency: 'COP',
		categoryId: 'accessories-bags',
		parentCategoryId: 'accessories-bags',
		variants: makeVariants(
			'bag-01',
			'/img/accessories',
			['Black', 'Olive', 'Sand'],
			oneSize,
		),
	},
	{
		id: 'eqp-01',
		name: 'Lifting Straps Pro',
		shortDescription: 'Heavy duty lifting straps.',
		longDescription: 'Cotton straps with reinforced stitching for heavy lifts.',
		price: 59000,
		currency: 'COP',
		categoryId: 'accessories-straps',
		parentCategoryId: 'accessories-straps',
		variants: makeVariants(
			'eqp-01',
			'/img/accessories',
			['Black', 'Red', 'Gray'],
			oneSize,
		),
	},
	{
		id: 'mhd-01',
		name: 'Core Hoodie',
		shortDescription: 'Warmup hoodie with soft lining.',
		longDescription: 'Brushed fleece interior with relaxed athletic fit.',
		price: 249000,
		currency: 'COP',
		categoryId: 'men-hoodies',
		parentCategoryId: 'men-hoodies',
		variants: makeVariants(
			'mhd-01',
			'/img/men/hoodies',
			['Charcoal', 'Black', 'Olive'],
			sizesClothes,
		),
	},
	{
		id: 'mjk-01',
		name: 'Training Shell Jacket',
		shortDescription: 'Water resistant shell.',
		longDescription: 'Windproof outer layer ideal for outdoor training.',
		price: 279000,
		currency: 'COP',
		categoryId: 'men-jackets',
		parentCategoryId: 'men-jackets',
		variants: makeVariants(
			'mjk-01',
			'/img/men/jackets',
			['Black', 'Navy', 'Olive'],
			sizesClothes,
		),
	},
	{
		id: 'msh-01',
		name: 'Performance Training Shorts',
		shortDescription: 'Stretch shorts with airflow.',
		longDescription: 'Lightweight shorts with laser-cut ventilation.',
		price: 169000,
		currency: 'COP',
		categoryId: 'men-shorts',
		parentCategoryId: 'men-shorts',
		variants: makeVariants(
			'msh-01',
			'/img/men/shorts',
			['Navy', 'Black', 'Gray'],
			sizesClothes,
		),
	},
	{
		id: 'msh-shorts-01',
		name: 'Sport Shorts',
		shortDescription: 'Performance shorts with stretch.',
		longDescription: 'Elastic waistband, lightweight fabric and side pockets.',
		price: 179000,
		currency: 'COP',
		categoryId: 'men-shorts',
		parentCategoryId: 'men-shorts',
		variants: makeVariants(
			'msh-shorts-01',
			'/img/men/shorts',
			['Olive', 'Black', 'Sand'],
			sizesClothes,
		),
	},
	{
		id: 'msw-01',
		name: 'Performance Swim Shorts',
		shortDescription: 'Quick dry swim shorts.',
		longDescription: 'Elastic waist, mesh lining and quick-dry fabric.',
		price: 139000,
		currency: 'COP',
		categoryId: 'men-swimwear',
		parentCategoryId: 'men-swimwear',
		variants: makeVariants(
			'msw-01',
			'/img/men/swim',
			['Aqua', 'Red', 'Navy'],
			sizesClothes,
		),
	},
	{
		id: 'mts-01',
		name: 'Essential Training Tee',
		shortDescription: 'Everyday performance t-shirt.',
		longDescription: 'Soft stretch cotton blend.',
		price: 129000,
		currency: 'COP',
		categoryId: 'men-t-shirts-tops',
		parentCategoryId: 'men-t-shirts-tops',
		variants: makeVariants(
			'mts-01',
			'/img/men/tees',
			['Sand', 'Black', 'White'],
			sizesClothes,
		),
	},
	{
		id: 'mts-tee-01',
		name: 'Arrival T-Shirt',
		shortDescription: 'Classic gym tee with athletic cut.',
		longDescription: 'Soft cotton blend with tapered sleeves.',
		price: 149000,
		currency: 'COP',
		categoryId: 'men-t-shirts-tops',
		parentCategoryId: 'men-t-shirts-tops',
		variants: makeVariants(
			'mts-tee-01',
			'/img/men/tees',
			['Black', 'Olive', 'Charcoal'],
			sizesClothes,
		),
	},
	{
		id: 'wjk-01',
		name: 'Lightweight Training Jacket',
		shortDescription: 'Windbreaker for outdoor sessions.',
		longDescription: 'Featherlight jacket with mesh ventilation panels.',
		price: 259000,
		currency: 'COP',
		categoryId: 'women-jackets',
		parentCategoryId: 'women-jackets',
		variants: makeVariants(
			'wjk-01',
			'/img/women/jackets',
			['Olive', 'Black', 'Sand'],
			sizesClothes,
		),
	},
	{
		id: 'wkf-leggings-01',
		name: 'Flex High-Waist Leggings',
		shortDescription: 'Sculpting high-rise leggings.',
		longDescription: 'High-waisted support with sweat-wicking fabric.',
		price: 289000,
		currency: 'COP',
		discount: 10,
		categoryId: 'women-high-waisted-leggings',
		parentCategoryId: 'women-leggings',
		variants: makeVariants(
			'wkf-leggings-01',
			'/img/women/leggings',
			['Black', 'Navy', 'Wine'],
			sizesLeggings,
		),
	},
	{
		id: 'wlg-06',
		name: 'High Rise Sculpt Leggings',
		shortDescription: 'Sculpting high-rise leggings.',
		longDescription: 'Compression fabric with contour seams.',
		price: 289000,
		currency: 'COP',
		categoryId: 'women-high-waisted-leggings',
		parentCategoryId: 'women-leggings',
		variants: makeVariants(
			'wlg-06',
			'/img/women/leggings',
			['Black', 'Gray', 'Navy'],
			sizesLeggings,
		),
	},
	{
		id: 'wlg-07',
		name: 'Scrunch Seamless Leggings',
		shortDescription: 'Scrunch detail for glute contour.',
		longDescription: 'Seamless fabric with scrunch seam.',
		price: 299000,
		currency: 'COP',
		categoryId: 'women-scrunch-leggings',
		parentCategoryId: 'women-leggings',
		variants: makeVariants(
			'wlg-07',
			'/img/women/leggings',
			['Wine', 'Black', 'Plum'],
			sizesLeggings,
		),
	},
	{
		id: 'wls-01',
		name: 'Seamless Long Sleeve Top',
		shortDescription: 'Seamless comfort with stretch.',
		longDescription: 'Form-fitting seamless top.',
		price: 199000,
		currency: 'COP',
		categoryId: 'women-long-sleeves',
		parentCategoryId: 'women-long-sleeves',
		variants: makeVariants(
			'wls-01',
			'/img/women/longsleeve',
			['Lavender', 'Black', 'Mint'],
			sizesClothes,
		),
	},
	{
		id: 'wsc-leggings-02',
		name: 'Scrunch Seamless Leggings',
		shortDescription: 'Seamless leggings with scrunch detail.',
		longDescription: 'Contour shading and scrunch seam.',
		price: 269000,
		currency: 'COP',
		categoryId: 'women-scrunch-leggings',
		parentCategoryId: 'women-leggings',
		variants: makeVariants(
			'wsc-leggings-02',
			'/img/women/leggings',
			['Burgundy', 'Black', 'Navy'],
			sizesLeggings,
		),
	},
	{
		id: 'wsh-01',
		name: 'Training Shorts Pro',
		shortDescription: 'Lightweight shorts for high intensity.',
		longDescription: 'Breathable stretch shorts with inner lining.',
		price: 179000,
		currency: 'COP',
		categoryId: 'women-shorts',
		parentCategoryId: 'women-shorts',
		variants: makeVariants(
			'wsh-01',
			'/img/women/shorts',
			['Gray', 'Black', 'Sand'],
			sizesClothes,
		),
	},
	{
		id: 'wsh-shorts-01',
		name: 'Training Shorts',
		shortDescription: 'Lightweight shorts for high intensity.',
		longDescription: 'Breathable fabric with stretch.',
		price: 189000,
		currency: 'COP',
		categoryId: 'women-shorts',
		parentCategoryId: 'women-shorts',
		variants: makeVariants(
			'wsh-shorts-01',
			'/img/women/shorts',
			['Gray', 'Olive', 'Black'],
			sizesClothes,
		),
	},
	{
		id: 'wtk-tank-01',
		name: 'Essential Tank',
		shortDescription: 'Soft stretch tank for training.',
		longDescription: 'Slim fit tank with breathable cotton blend.',
		price: 129000,
		currency: 'COP',
		categoryId: 'women-tank-tops',
		parentCategoryId: 'women-tank-tops',
		variants: makeVariants(
			'wtk-tank-01',
			'/img/women/tanks',
			['White', 'Black', 'Mint'],
			sizesClothes,
		),
	},
	{
		id: 'wtt-01',
		name: 'Breathable Training Tank',
		shortDescription: 'Airy tank for tough sessions.',
		longDescription: 'Ultra-light tank with sweat-wicking technology.',
		price: 119000,
		currency: 'COP',
		categoryId: 'women-tank-tops',
		parentCategoryId: 'women-tank-tops',
		variants: makeVariants(
			'wtt-01',
			'/img/women/tanks',
			['Mint', 'Black', 'Lavender'],
			sizesClothes,
		),
	},
];

export const seedCategories = async () => {
	try {
		await Promise.all(
			productsSeed.map((product) =>
				db.collection('products').doc(product.id).set(product),
			),
		);

		console.log('✅ Categories seeded');
	} catch (error) {
		console.error('❌ Error seeding categories', error);
	}
};
