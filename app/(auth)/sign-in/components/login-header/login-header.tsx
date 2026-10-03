import Image from 'next/image';
import GymsharkLogo from '@/public/gymshark-logo.png';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

interface LoginHeaderProps {
	title: string;
	subTitle: string;
}
export const LoginHeader = ({ title, subTitle }: LoginHeaderProps) => {
	return (
		<>
			<figure>
				<Image
					src={GymsharkLogo}
					alt="Fit Store Logo"
					width={100}
					height={100}
				/>
			</figure>
			<Heading as="h5">{title}</Heading>
			<Text as="p" className=" px-20 text-sm text-gray-700 text-center">
				{subTitle}
			</Text>
		</>
	);
};
