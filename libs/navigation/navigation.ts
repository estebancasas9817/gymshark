export const navigation = [
	{
		name: 'Women',
		id: 'women',
		children: [
			{
				name: 'Trending',
				id: 'trending',
				children: [
					{ name: 'New Arrivals', href: '/women/new-arrivals' },
					{ name: 'Best Sellers', href: '/women/best-sellers' },
					{ name: 'Running', href: '/women/running' },
					{ name: 'New Shorts', href: '/women/new-shorts' },
					{ name: 'Hybrid Training', href: '/women/hybrid-training' },
					{ name: 'Shop Last Chance', href: '/women/shop-last-chance' },
				],
			},
			{
				name: 'All Leggings',
				id: 'leggings',
				children: [
					{ name: 'All Leggings', href: '/women/leggings' },
					{
						name: 'High-Waisted Leggings',
						href: '/women/high-waisted-leggings',
					},
					{ name: 'Scrunch Butt Leggings', href: '/women/scrunch-leggings' },
					{ name: 'Flare Leggings', href: '/women/flare-leggings' },
					{ name: 'Leggings With Pockets', href: '/women/pocket-leggings' },
					{ name: 'Tall Leggings', href: '/women/tall-leggings' },
				],
			},
			{
				name: 'Products',
				id: 'products',
				children: [
					{ name: 'All Products', href: '/women/all-products' },
					{ name: 'Leggings', href: '/women/leggings' },
					{ name: 'T-Shirt & Tops', href: '/women/t-shirts-and-tops' },
					{ name: 'Sport Bras', href: '/women/sport-bras' },
					{ name: 'Tank Tops', href: '/women/tank-tops' },
					{ name: 'Long Sleeves', href: '/women/long-sleeves' },
					{ name: 'Shorts', href: '/women/shorts' },
					{ name: 'Matching Sets', href: '/women/matching-sets' },
					{
						name: 'Hoodies & Sweatshirts',
						href: '/women/hooides-and-sweatshirts',
					},
					{ name: 'Jackets', href: '/women/jackets' },
					{
						name: 'Joggers & Sweatpants',
						href: '/women/joggers-and-sweatpants',
					},
					{ name: 'Pants', href: '/women/pants' },
				],
			},
			{
				name: 'Accessories',
				id: 'accessories',
				children: [
					{ name: 'All Accessories', href: '/women/all-accessories' },
					{ name: 'All Socks', href: '/women/all-socks' },
				],
			},
			{
				name: 'Last Chance',
				id: 'lastChance',
				children: [{ name: 'For Less', href: '/women/last-chance' }],
			},
		],
	},
	{
		name: 'Men',
		id: 'men',
		children: [
			{
				name: 'Trending',
				id: 'trending',
				children: [
					{ name: 'New In', href: '/men/new-in' },
					{ name: 'Best Sellers', href: '/men/best-sellers' },
					{ name: 'Restock', href: '/men/restock' },
				],
			},
			{
				name: 'Shop By Product',
				id: 'shop-by-product',
				children: [
					{ name: 'T-Shirts & Tops', href: '/men/t-shirts-tops' },
					{ name: 'Stringers & Tanks', href: '/men/tanks' },
					{ name: 'Shorts', href: '/men/shorts' },
					{ name: 'Joggers & Sweatpants', href: '/men/joggers' },
					{ name: 'Hoodies & Sweatshirts', href: '/men/hoodies' },
					{ name: 'Jackets', href: '/men/jackets' },
					{ name: 'Swimwear', href: '/men/swimwear' },
				],
			},
			{
				name: 'Shop By Collection',
				id: 'collections',
				children: [
					{ name: 'Arrival', href: '/men/arrival' },
					{ name: 'Power', href: '/men/power' },
					{ name: 'Vital', href: '/men/vital' },
					{ name: 'Heritage', href: '/men/heritage' },
				],
			},
			{
				name: 'Accessories',
				id: 'accessories',
				children: [
					{ name: 'Bags', href: '/men/accessories/bags' },
					{ name: 'Caps & Hats', href: '/men/accessories/caps' },
					{ name: 'Socks', href: '/men/accessories/socks' },
					{ name: 'Underwear', href: '/men/accessories/underwear' },
				],
			},
		],
	},
	{
		name: 'Accessories',
		id: 'accessories',
		children: [
			{
				name: 'Accessories',
				id: 'all-accessories',
				children: [
					{ name: 'All Accessories', href: '/accessories' },
					{ name: 'Bags', href: '/accessories/bags' },
					{ name: 'Caps & Hats', href: '/accessories/caps' },
					{ name: 'Socks', href: '/accessories/socks' },
					{ name: 'Underwear', href: '/accessories/underwear' },
					{ name: 'Equipment', href: '/accessories/equipment' },
				],
			},
			{
				name: 'Training Accessories',
				id: 'training',
				children: [
					{ name: 'Gym Equipment', href: '/accessories/equipment' },
					{ name: 'Water Bottles', href: '/accessories/bottles' },
					{ name: 'Lifting Straps', href: '/accessories/straps' },
				],
			},
		],
	},
];
