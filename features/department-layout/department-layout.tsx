import { Suspense } from 'react';
import { AboutContentSection } from '../about-content-section';
import { Banner } from '../banner';
import { ShopByDepartment } from '../shop-by-department';
import { TrainingCategorySection } from '../training-category-section';
import { RecommendedProducts } from '@/components/ui/recommended-products';
import { Recommendedkeletons } from '@/components/ui/recommended-skeletons';

interface DepartmentLayoutProps {
	department: 'home' | 'women' | 'men';
}

const DEPARTMENT_DATA = [
	{
		department: 'home',
		slugs: [
			'accessories/all-accessories',
			'women/shorts',
			'men/tanks',
			'women/sport-bras',
		],
		banners: [
			{
				title: 'GEAR UP, LOCK IN',
				desciption:
					'Premium gym essentials engineered for maximum support, grip, and utility. From heavy lifts to daily commutes, carry your progress with confidence.',
				button: 'Shop Accessories',
				href: '',
			},
			{
				title: 'ELEMENT, ZERO LIMITS',
				desciption:
					'Ultra-durable, lightweight ripstop fabric designed to withstand your most intense sessions. Engineered for ventilation where you need it most.',
				button: 'Shop Tops',
				href: '',
			},
			{
				title: 'VITAL, PURE FREEDOM',
				desciption:
					'A minimalist aesthetic meets maximum flexibility. Unmatched stretch and a contouring fit that feels completely weightless.',
				button: 'Shop Shorts',
				href: '',
			},
		],
		sectionsName: [
			'WE RECOMMEND',
			'TOP 10 SHORTS',
			'WELCOME TO YOUR EDIT',
			`WOMEN'S BESTSELLERS`,
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
				desciption: `Same Whitney, just with a lower waistband. Sculpting, buttery soft and
					still your go-to.`,
				button: 'Shop Leggings',
				href: '',
			},
			{
				title: 'ELEVATE, SHAPED FOR MOTION',
				desciption:
					'High-waisted support meets zero-distraction fabric. Sculpting, moisture-wicking, and designed to hold its shape through your toughest workouts.',
				button: 'Shop Shorts',
				href: '',
			},
			{
				title: 'AURA, SEAMLESS COMFORT',
				desciption:
					'An ultra-lightweight knit with a second-skin feel. Breathable stretch that effortlessly transitions from the studio to your daily routine.',
				button: 'Shop Shorts',
				href: '',
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
				desciption:
					'High-endurance engineering, maximum breathability, and an athletic fit that moves with you. Push your limits today.',
				button: 'Shop Training',
				href: '',
			},
			{
				title: 'CORE, YOUR NEW ESSENTIALS',
				desciption:
					'The same durability, now with an ultra-lightweight, buttery-soft fabric. Designed for breaking PRs and rest days alike.',
				button: 'Shop Hoodies',
				href: '',
			},
			{
				title: 'POWER, STRONGER THAN EVER',
				desciption:
					'Ergonomic cuts to highlight your physique and sweat-wicking tech to keep you cool through every set. Your new training uniform.',
				button: 'Shop Shorts',
				href: '',
			},
		],
	},
];

export const DepartmentLayout = async ({
	department,
}: DepartmentLayoutProps) => {
	const bannerContent = {
		women: [
			{
				alt: 'running',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777498130/photo-1480179087180-d9f0ec044897_uigxuh.jpg',
				title: 'Running',
				description: 'Seamless, weightless tops drop April 30, 2pm EDT.',
			},
			{
				alt: 'lifting',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777498218/photo-1595078475328-1ab05d0a6a0e_ms28uu.jpg',
				title: 'Lifting',
			},
			{
				alt: 'hiit',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777498279/photo-1593431763017-c689a61b729a_u48rdy.jpg',
				title: 'Hiit',
			},
			{
				alt: 'pilates',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777498335/photo-1747239202356-764770773c9a_fmudto.jpg',
				title: 'Pilates',
			},
		],
		men: [
			{
				alt: 'running',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777500707/photo-1559166631-ef208440c75a_dllyq0.jpg',
				title: 'Running',
			},
			{
				alt: 'lifting',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777500780/photo-1585152968992-851c3a8e1678_xuealt.jpg',
				title: 'Lifting',
			},
			{
				alt: 'hiit',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777500837/photo-1669322779651-5ca89652492e_jfutnw.jpg',
				title: 'Hiit',
			},
			{
				alt: 'pilates',
				imageUrl:
					'https://res.cloudinary.com/dqfcdiyvm/image/upload/v1777501151/photo-1713428856219-20e151269843_asqhh1.png',
				title: 'Pilates',
			},
		],
	};
	let slugs = DEPARTMENT_DATA[0].slugs;
	let sectionNames = DEPARTMENT_DATA[0].sectionsName;
	let banners = DEPARTMENT_DATA[0].banners;
	if (department === 'women') {
		slugs = DEPARTMENT_DATA[1].slugs;
		sectionNames = DEPARTMENT_DATA[1].sectionsName;
		banners = DEPARTMENT_DATA[1].banners;
	} else if (department === 'men') {
		slugs = DEPARTMENT_DATA[2].slugs;
		sectionNames = DEPARTMENT_DATA[2].sectionsName;
		banners = DEPARTMENT_DATA[2].banners;
	}

	return (
		<>
			<Banner
				title={banners[0].title}
				button={banners[0].button}
				description={banners[0].desciption}
				href={banners[0].href}
			/>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts
					slug={slugs[0]}
					sectionName={sectionNames[0]}
					page={2}
				/>
			</Suspense>

			<Banner
				title={banners[1].title}
				button={banners[1].button}
				description={banners[1].desciption}
				href={banners[1].href}
			/>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts
					slug={slugs[1]}
					sectionName={sectionNames[1]}
					page={2}
					shouldUpdateImgOnHover
				/>
			</Suspense>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts slug={slugs[2]} sectionName={sectionNames[2]} />
			</Suspense>
			<Banner
				title={banners[2].title}
				button={banners[2].button}
				description={banners[2].desciption}
				href={banners[2].href}
			/>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts
					slug={slugs[3]}
					sectionName={sectionNames[3]}
					page={2}
				/>
			</Suspense>
			<TrainingCategorySection
				title="HOW DO YOU TRAIN?"
				content={bannerContent}
			/>
			<ShopByDepartment />
			<AboutContentSection department={department} />
		</>
	);
};
