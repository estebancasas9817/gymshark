import { Text } from '@/components/ui/text';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('home');
	return <Text>{t('title')}</Text>;
}
