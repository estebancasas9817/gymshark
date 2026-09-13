import { Stack } from '@/components/layout/stack';
import { useTranslations } from 'next-intl';

export const LegalLinks = ({
	direction = 'row',
}: {
	direction: 'row' | 'column';
}) => {
	const t = useTranslations('Footer.bottomBar');
	const legalKeys = Object.keys(t.raw('links'));

	return (
		<Stack as="nav" className="mt-6 lg:mt-0">
			<Stack
				as="ul"
				direction={direction}
				className="text-sm text-primary lg:text-gray-700 gap-2 lg:gap-2 items-center md:items-start"
			>
				{legalKeys.map((key) => (
					<li key={key}>
						<a
							href={`/${key}`}
							target="_blank"
							className="hover:text-primary underline lg:no-underline lg:text-xs xl:text-sm"
						>
							{t(`links.${key}`)}
						</a>
					</li>
				))}
			</Stack>
		</Stack>
	);
};
