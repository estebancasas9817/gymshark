import { db } from '@/libs/firebase/init-firestore';
import { v2 as cloudinary } from 'cloudinary';
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// ------------------------------------------------------------
const CLOUDINARY_CLOUD_NAME = 'dqfcdiyvm';
const CLOUDINARY_API_KEY = '123838262377739';
const CLOUDINARY_API_SECRET = 'iv0m1SyWPi6vGIBhSO7Jz1hrU2A';
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

// TODO: DELETE THIS WHOLE FILE + REMOVE CLODINARY FROM PACKAGE JSON

const SIZES = [{ size: 'One Size', stock: 100 }];

const getImagesFromFolder = async (folderPath: string) => {
	const res = await cloudinary.search
		.expression(`folder:${folderPath}`)
		.sort_by('public_id', 'asc')
		.max_results(3)
		.execute();

	return res.resources.map((r: any) => r.secure_url);
};

export const runCloudinaryScript = async () => {
	for (let i = 1; i <= 15; i++) {
		//* 1. -> Cantidad productos
		const bagId = `hoodie-m-${String(i).padStart(2, '0')}`; //*2 -> id en firebase
		const folderId = `men-hoddies-${String(i).padStart(2, '0')}`; //*3 -> sub-folder
		const baseFolder = `ecommerce/men-hoddies/${folderId}`; //*4 -> folder principal

		const colors = ['black', 'blue', 'red', 'white'];

		for (const color of colors) {
			const folder = `${baseFolder}/${color}`;
			const images = await getImagesFromFolder(folder);

			const skuId = `${bagId.toUpperCase()}-${color.toUpperCase()}`;

			await db
				.collection('products')
				.doc(bagId)
				.collection('skus')
				.doc(skuId)
				.update({
					images,
				});

			console.log(`✅ Created ${skuId}`);
		}
	}

	console.log('🎉 Bags SKUs created');
};

const navigation = [
	{
		id: 'women',
		label: 'Women',
		href: 'women',
		order: 1,
		categories: [
			{
				id: 'leggings',
				label: 'Leggings',
				slug: 'women-leggings',
				href: 'women/leggings',
			},
			{
				id: 'sports-bras',
				label: 'Sports Bras',
				slug: 'women-sports-bras',
				href: 'women/sport-bras',
			},
			{
				id: 'shorts',
				label: 'Shorts',
				slug: 'women-shorts',
				href: 'women/shorts',
			},
			{
				id: 'tshirts',
				label: 'T-shirts',
				slug: 'women-t-shirts',
				href: 'women/t-shirts',
			},
			{
				id: 'hoodies',
				label: 'Hoodies',
				slug: 'women-hoodies',
				href: 'women/hoodies',
			},
		],
	},
	{
		id: 'men',
		label: 'Men',
		href: 'men',
		order: 2,
		categories: [
			{
				id: 'tanks',
				label: 'Tanks',
				slug: 'men-tanks',
				href: 'men/tanks',
			},
			{
				id: 'joggers',
				label: 'Joggers',
				slug: 'men-joggers',
				href: 'men/joggers',
			},
			{
				id: 'shorts',
				label: 'Shorts',
				slug: 'men-shorts',
				href: 'men/shorts',
			},
			{
				id: 'tshirts',
				label: 'T-shirts',
				slug: 'men-t-shirts',
				href: 'men/t-shirts',
			},
			{
				id: 'hoodies',
				label: 'Hoodies',
				slug: 'men-hoodies',
				href: 'men/hoodies',
			},
		],
	},
	{
		id: 'accessories',
		label: 'Accessories',
		href: 'accessories/all-accessories',
		order: 3,
		categories: [
			{
				id: 'bags',
				label: 'Bags',
				slug: 'accessories-bags',
				href: 'accessories/bags',
			},
			{
				id: 'socks',
				label: 'Socks',
				slug: 'accessories-socks',
				href: 'accessories/socks',
			},
			{
				id: 'caps',
				label: 'Caps',
				slug: 'accessories-caps',
				href: 'accessories/caps',
			},
		],
	},
];
export async function seedNavigation() {
	const batch = db.batch();

	navigation.forEach((item) => {
		const ref = db.collection('navigation').doc(item.id);

		batch.set(ref, item);
	});

	await batch.commit();

	console.log('✅ Navigation seeded');
}

interface EditorialStat {
	icon: string;
	label: string;
	description: string;
}

interface EditorialBannerPayload {
	id: string;
	categorySlug: string;
	title: string;
	description: string;
	image: string;
	badge: string;
	stats: EditorialStat[];
	createdAt: FirebaseFirestore.FieldValue;
}

/* ─── Brand stats (shared across all categories) ─────────────────────────── */

const BRAND_STATS: EditorialStat[] = [
	{
		icon: 'truck',
		label: 'Free shipping',
		description: 'On all orders over $75',
	},
	{
		icon: 'shield-check',
		label: 'Premium quality',
		description: 'Engineered fabrics built for athletes',
	},
	{
		icon: 'star',
		label: '10,000+ reviews',
		description: 'Trusted by athletes worldwide',
	},
];

/* ─── Banner data per category ───────────────────────────────────────────── */

const EDITORIAL_BANNERS = [
	{
		categorySlug: 'accessories',
		title: 'All Accessories',
		description:
			'A workout outfit is never complete without the right accessories. Built for performance, designed to last.',
		image: '/images/editorial/accessories.jpg',
		badge: 'New season',
	},
	{
		categorySlug: 'women',
		title: "All Women's",
		description:
			'Engineered for every movement. From the gym to the streets — wear what works.',
		image: '/images/editorial/women.jpg',
		badge: 'New arrivals',
	},
	{
		categorySlug: 'men',
		title: "All Men's",
		description:
			'Performance-first fits built for training hard and looking the part.',
		image: '/images/editorial/men.jpg',
		badge: 'Best sellers',
	},
] as const;

/* ─── Seed function ──────────────────────────────────────────────────────── */

/**
 * Adds editorial banners to the `editorialBanners` collection in Firestore.
 * Uses categorySlug as the document ID for fast lookups.
 * Safe to run multiple times — .set() overwrites existing documents.
 *
 * Usage:
 *   import { seedEditorialBanners } from "@/lib/firebase/seedEditorialBanners";
 *   await seedEditorialBanners();
 */
export async function seedEditorialBanners(): Promise<void> {
	const results = await Promise.allSettled(
		EDITORIAL_BANNERS.map((banner) => {
			const payload: EditorialBannerPayload = {
				id: crypto.randomUUID(),
				categorySlug: banner.categorySlug,
				title: banner.title,
				description: banner.description,
				image: banner.image,
				badge: banner.badge,
				stats: BRAND_STATS,
				createdAt: FieldValue.serverTimestamp(),
			};

			// Document ID = categorySlug → fetch with db.collection("editorialBanners").doc(slug).get()
			return db
				.collection('editorialBanners')
				.doc(banner.categorySlug)
				.set(payload);
		}),
	);

	results.forEach((result, i) => {
		const slug = EDITORIAL_BANNERS[i].categorySlug;
		if (result.status === 'fulfilled') {
			console.log(`✓ editorialBanners/${slug}`);
		} else {
			console.error(`✗ editorialBanners/${slug}:`, result.reason);
		}
	});
}

// ------------

const DEPARTMENT_DATA = [
	{
		department: 'home',
		slugs: [
			'accessories/all-accessories',
			'women/shorts',
			'men/tanks',
			'women/sport-bras',
		],
		sectionsName: [
			'WE RECOMMEND',
			'TOP 10 SHORTS',
			'WELCOME TO YOUR EDIT',
			"WOMEN'S BESTSELLERS",
		],
		banners: [
			{
				title: 'GEAR UP, LOCK IN',
				description:
					'Premium gym essentials engineered for maximum support, grip, and utility. From heavy lifts to daily commutes, carry your progress with confidence.',
				button: 'Shop Accessories',
				href: '',
				image: '',
			},
			{
				title: 'ELEMENT, ZERO LIMITS',
				description:
					'Ultra-durable, lightweight ripstop fabric designed to withstand your most intense sessions. Engineered for ventilation where you need it most.',
				button: 'Shop Tops',
				href: '',
				image: '',
			},
			{
				title: 'VITAL, PURE FREEDOM',
				description:
					'A minimalist aesthetic meets maximum flexibility. Unmatched stretch and a contouring fit that feels completely weightless.',
				button: 'Shop Shorts',
				href: '',
				image: '',
			},
		],
	},
	{
		department: 'women',
		slugs: [
			'women/hoodies',
			'women/leggings',
			'women/t-shirts',
			'women/sport-bras',
		],
		sectionsName: [
			'WE RECOMMEND',
			'NEW IN LEGGINGS',
			'WELCOME TO YOUR EDIT',
			'BESTSELLERS',
		],
		banners: [
			{
				title: 'WHITNEY, JUST A LITTLE LOWER',
				description:
					'Same Whitney, just with a lower waistband. Sculpting, buttery soft and still your go-to.',
				button: 'Shop Leggings',
				href: '',
				image: '',
			},
			{
				title: 'ELEVATE, SHAPED FOR MOTION',
				description:
					'High-waisted support meets zero-distraction fabric. Sculpting, moisture-wicking, and designed to hold its shape through your toughest workouts.',
				button: 'Shop Shorts',
				href: '',
				image: '',
			},
			{
				title: 'AURA, SEAMLESS COMFORT',
				description:
					'An ultra-lightweight knit with a second-skin feel. Breathable stretch that effortlessly transitions from the studio to your daily routine.',
				button: 'Shop Shorts',
				href: '',
				image: '',
			},
		],
	},
	{
		department: 'men',
		slugs: ['men/t-shirts', 'men/joggers', 'men/hoodies', 'men/shorts'],
		sectionsName: [
			'WE RECOMMEND',
			'NEW IN JOGGERS',
			'WELCOME TO YOUR EDIT',
			'BESTSELLERS',
		],
		banners: [
			{
				title: 'APEX, BUILT TO LAST',
				description:
					'High-endurance engineering, maximum breathability, and an athletic fit that moves with you. Push your limits today.',
				button: 'Shop Training',
				href: '',
				image: '',
			},
			{
				title: 'CORE, YOUR NEW ESSENTIALS',
				description:
					'The same durability, now with an ultra-lightweight, buttery-soft fabric. Designed for breaking PRs and rest days alike.',
				button: 'Shop Hoodies',
				href: '',
				image: '',
			},
			{
				title: 'POWER, STRONGER THAN EVER',
				description:
					'Ergonomic cuts to highlight your physique and sweat-wicking tech to keep you cool through every set. Your new training uniform.',
				button: 'Shop Shorts',
				href: '',
				image: '',
			},
		],
	},
];

export async function SeedMyBanners() {
	console.log('🌱 Seeding editorialBanners...');

	for (const data of DEPARTMENT_DATA) {
		await db
			.collection('banners')
			.doc(data.department)
			.set(data, { merge: true });

		console.log(`✅ Seeded department: ${data.department}`);
	}

	console.log('🎉 Done seeding editorialBanners!');
	process.exit(0);
}
