import { Container } from '@/components/layout/container';
import { capitalize } from '@/utils/capitalize/capitalize';
import { useTranslations } from 'next-intl';
import { ContentArticle } from './content-article';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';

interface AboutContentSectionProps {
	department: 'home' | 'women' | 'men';
}
type SeoContentType = {
	id: string;
	title: string;
	paragraphs: string[];
};

export const AboutContentSection = ({
	department,
}: AboutContentSectionProps) => {
	const t = useTranslations(`${capitalize(department)}.seoContent`);
	const articles: SeoContentType[] = t.raw(`articles.${department}`);

	return (
		<Container as="section">
			<Divider />
			{articles.map(({ id, paragraphs, title }, articleIndex) => {
				const headingTag = articleIndex === 0 ? 'h1' : 'h2';
				const headingSize = articleIndex === 0 ? 'xl' : 'lg';
				return (
					<ContentArticle key={id}>
						<Heading
							as={headingTag}
							size={headingSize}
							className="text-lg md:text-xl lg:text-3xl"
						>
							{title}
						</Heading>
						{paragraphs.map((_, pIndex) => (
							<Text as="p" key={pIndex} className="text-sm text-gray-700">
								{t.rich(
									`articles.${department}.${articleIndex}.paragraphs.${pIndex}`,
									{
										bold: (chunks) => (
											<strong className="font-bold text-primary">
												{chunks}
											</strong>
										),
									},
								)}
							</Text>
						))}
					</ContentArticle>
				);
			})}
		</Container>
	);
};
