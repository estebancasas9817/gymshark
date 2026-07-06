import { Suspense } from 'react';
import { AboutContentSection } from '../about-content-section';
import { Banner } from '../banner';
import { ShopByDepartment } from '../shop-by-department';
import { RecommendedProducts } from '@/components/ui/recommended-products';
import { Recommendedkeletons } from '@/components/ui/recommended-skeletons';
import { getDepartmentData } from '@/libs/firebase/db/banners/get-department-data';

interface DepartmentLayoutProps {
	department: 'home' | 'women' | 'men';
}

export const DepartmentLayout = async ({
	department,
}: DepartmentLayoutProps) => {
	const { slugs, sectionsName, banners } = await getDepartmentData(department);

	return (
		<>
			<Banner
				title={banners[0].title}
				button={banners[0].button}
				description={banners[0].description}
				href={banners[0].href}
				image={banners[0].image}
			/>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts
					slug={slugs[0]}
					sectionName={sectionsName[0]}
					page={2}
				/>
			</Suspense>

			<Banner
				title={banners[1].title}
				button={banners[1].button}
				description={banners[1].description}
				href={banners[1].href}
				image={banners[1].image}
			/>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts
					slug={slugs[1]}
					sectionName={sectionsName[1]}
					page={2}
					shouldUpdateImgOnHover
				/>
			</Suspense>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts slug={slugs[2]} sectionName={sectionsName[2]} />
			</Suspense>
			<Banner
				title={banners[2].title}
				button={banners[2].button}
				description={banners[2].description}
				href={banners[2].href}
				image={banners[2].image}
			/>
			<Suspense fallback={<Recommendedkeletons />}>
				<RecommendedProducts
					slug={slugs[3]}
					sectionName={sectionsName[3]}
					page={2}
				/>
			</Suspense>
			<ShopByDepartment />
			<AboutContentSection department={department} />
		</>
	);
};
