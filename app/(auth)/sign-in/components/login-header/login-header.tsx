import Image from 'next/image';
import GymsharkLogo from '@/public/gymshark-logo.png';
import { Text } from '@/components/ui/text';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/heading';

export const LoginHeader = () => {
	const t = useTranslations('Login.auth.header');
	return (
		<>
			<figure>
				<Image
					src={GymsharkLogo}
					alt="Gymshark Logo"
					width={100}
					height={100}
				/>
			</figure>
			<Heading as="h5">{t('title')}</Heading>
			<Text as="p" className=" px-20 text-sm text-gray-700 text-center">
				{t('subtitle')}
			</Text>
		</>
	);
};
