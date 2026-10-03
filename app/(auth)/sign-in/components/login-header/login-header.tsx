import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { CgGym } from 'react-icons/cg';

interface LoginHeaderProps {
	title: string;
	subTitle: string;
}
export const LoginHeader = ({ title, subTitle }: LoginHeaderProps) => {
	return (
		<>
			<CgGym size={100} />
			<Heading as="h5">{title}</Heading>
			<Text as="p" className=" px-20 text-sm text-gray-700 text-center">
				{subTitle}
			</Text>
		</>
	);
};
