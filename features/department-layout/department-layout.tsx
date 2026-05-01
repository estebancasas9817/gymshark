import { AboutContentSection } from '../about-content-section';
import { Banner } from '../banner';
import { Carousel } from '../carousel';
import { ProductCardContainer } from '../product-card-container';
import { ShopByDepartment } from '../shop-by-department';
import { TrainingCategorySection } from '../training-category-section';

interface DepartmentLayoutProps {
	department: 'home' | 'women' | 'men';
}

export const DepartmentLayout = ({ department }: DepartmentLayoutProps) => {
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
	return (
		<>
			<Banner />
			<Carousel sectionName="WE RECOMMEND" className="w-full my-16">
				<ProductCardContainer />
			</Carousel>
			<Banner />
			<Carousel sectionName="WE RECOMMEND" className="w-full my-16">
				<ProductCardContainer />
			</Carousel>
			<Carousel sectionName="WELCOME TO YOUR EDIT" className="w-full my-16">
				<ProductCardContainer />
			</Carousel>
			<TrainingCategorySection
				title="POPULAR RIGHT NOW"
				content={bannerContent}
			/>
			<Banner />
			<Carousel sectionName="BESTSELLERS" className="w-full my-16">
				<ProductCardContainer />
			</Carousel>
			<TrainingCategorySection
				title="HOW DO YOU TRAIN?"
				content={bannerContent}
			/>
			<ShopByDepartment />
			<TrainingCategorySection
				title="WAIT THERE'S MORE..."
				content={bannerContent}
			/>
			<AboutContentSection department={department} />
		</>
	);
};
