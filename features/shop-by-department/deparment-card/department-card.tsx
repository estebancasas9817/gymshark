import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import Image from 'next/image';
import Link from 'next/link';
import ShopWomen from '@/public/shop-women.jpeg';
import ShopMen from '@/public/shop-men.avif';
import ShopAccesories from '@/public/shop-accesories.jpeg';
import { Text } from '@/components/ui/text';

interface DepartmentCardProps {
	title: string;
	href: string;
}

const DEPARTMENT_NAMES = {
	women: 'WOMEN',
	accessories: 'ACCESSORIES',
	men: 'men',
};

export const DepartmentCard = ({ title, href }: DepartmentCardProps) => {
	let imageUlr = ShopMen;
	if (title.includes(DEPARTMENT_NAMES.women)) {
		imageUlr = ShopWomen;
	} else if (title.includes(DEPARTMENT_NAMES.accessories)) {
		imageUlr = ShopAccesories;
	}

	return (
		<Stack as="article" className="shrink-0 w-full md:w-1/2 lg:flex-1">
			<figure className="w-full relative h-160">
				<Link href={href}>
					<Image src={imageUlr} alt={title} fill />
				</Link>
			</figure>
			<Text as="p" size="sm" className="text-md font-bold font-sans">
				<Link href={href}>{title}</Link>
			</Text>
		</Stack>
	);
};
