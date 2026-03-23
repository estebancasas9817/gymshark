import { Container } from '@/components/layout/container';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('home');
	return <Container>{t('title')}</Container>;
}
