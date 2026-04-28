import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface FooterNavLinksProps {
	section: string;
}
export const FooterNavLinks = ({ section }: FooterNavLinksProps) => {
	const t = useTranslations('Footer.sections');

	return (
		<Stack as="ul" gap="sm" className="gap-2">
			<Text as="p" className="text-sm font-sans text-primary font-bold mb-4">
				{t(`${section}.title`)}
			</Text>
			{Object.keys(t.raw(`${section}.links`)).map((linkKey) => {
				if (linkKey === 'login' || linkKey === 'register') {
					return (
						<Link
							href={`/${linkKey}`}
							key={linkKey}
							className="text-sm text-gray-600 hover:text-primary"
						>
							{t(`${section}.links.${linkKey}`)}
						</Link>
					);
				}
				return (
					<li key={linkKey}>
						<a
							href={`/${linkKey}`}
							className=" text-sm text-gray-600 hover:text-primary"
						>
							{t(`${section}.links.${linkKey}`)}
						</a>
					</li>
				);
			})}
		</Stack>
	);
};
