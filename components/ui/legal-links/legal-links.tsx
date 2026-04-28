import { Stack } from '@/components/layout/stack';
import { useTranslations } from 'next-intl';

export const LegalLinks = () => {
	const t = useTranslations('Footer.bottomBar');
	const legalKeys = Object.keys(t.raw('links'));
	return (
		<Stack as="nav">
			<Stack as="ul" direction="row" className="text-sm text-gray-700">
				{legalKeys.map((key) => (
					<li key={key}>
						<a href={`/${key}`} target="_blank" className="hover:text-primary">
							{t(`links.${key}`)}
						</a>
					</li>
				))}
			</Stack>
		</Stack>
	);
};
