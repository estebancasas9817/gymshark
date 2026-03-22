import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('home');
	return <div className="font-body">{t('title')}</div>;
}
