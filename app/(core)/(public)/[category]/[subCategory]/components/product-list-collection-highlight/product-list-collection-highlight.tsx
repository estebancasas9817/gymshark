import { getEditorialBanner } from '@/libs/firebase/db/categories/get-editorial-banner';
import ProductListCollectionHighlightClient from './product-list-collection-highlight.client';

interface ProductListCollectionHighlightProps {
	category: string;
	index: number;
}

export const ProductListCollectionHighlight = async ({
	category,
	index,
}: ProductListCollectionHighlightProps) => {
	const bannerData = await getEditorialBanner(category);
	if (bannerData === null) return null;
	const { title, badge, description, image, stats } = bannerData;

	return (
		<ProductListCollectionHighlightClient
			badge={badge}
			title={title}
			stats={stats}
			image={image}
			description={description}
			index={index}
		/>
	);
};
