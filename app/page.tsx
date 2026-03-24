import { Stack } from '@/components/layout/stack';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('home');
	return <Stack>{t('title')}</Stack>;
}
