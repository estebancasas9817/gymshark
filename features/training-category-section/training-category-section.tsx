'use client';

import { Container } from '@/components/layout/container';
import { useState } from 'react';
import { CategoryGrid } from './category-grid';
import { CategoryCard } from './category-card';
import { Heading } from '@/components/ui/heading';
import { Stack } from '@/components/layout/stack';
import { ActionPill } from '@/components/ui/action-pill';
import { cn } from '@/utils/cn/cn';

type ContentType = {
	[key: string]: {
		imageUrl: string;
		alt: string;
		title: string;
		description?: string;
	}[];
};
interface TrainingCategorySectionProps {
	title: string;
	content: ContentType;
}

export const TrainingCategorySection = ({
	title,
	content,
}: TrainingCategorySectionProps) => {
	const [activePosition, setActivePosition] = useState<number>(0);
	const dinamicKeys = Object.keys(content);
	const activeKey = dinamicKeys[activePosition];
	const trainingContent = content[activeKey];

	const handleClick = (index: number) => {
		if (index === activePosition) return;
		setActivePosition(index);
	};

	return (
		<Container as="section" className="mb-20">
			<Stack>
				<Heading as="h2" size="base">
					{title}
				</Heading>
				<Stack direction="row">
					{dinamicKeys.map((key, index) => (
						<ActionPill
							key={key}
							onClick={() => handleClick(index)}
							className={cn(
								'cursor-pointer font-bold font-sans text-sm py-2',
								index === activePosition && 'bg-primary text-secondary',
							)}
						>
							{key.toUpperCase()}
						</ActionPill>
					))}
				</Stack>
				<CategoryGrid>
					{trainingContent.map(({ title, alt, imageUrl, description }) => (
						<CategoryCard
							key={title}
							alt={alt}
							imageUrl={imageUrl}
							description={description}
							title={title}
						/>
					))}
				</CategoryGrid>
			</Stack>
		</Container>
	);
};
