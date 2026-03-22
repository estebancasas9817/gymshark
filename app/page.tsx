import { Heading } from '@/components/ui/heading';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('home');
	return <Heading>{t('title')}</Heading>;
}
