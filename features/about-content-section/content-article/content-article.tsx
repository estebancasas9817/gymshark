import { Stack } from '@/components/layout/stack';
import { ReactNode } from 'react';

interface ContentArticleProps {
	children: ReactNode;
}

export const ContentArticle = ({ children }: ContentArticleProps) => {
	return (
		<Stack as="article" className="mt-12 mb-8 last:mb-4">
			{children}
		</Stack>
	);
};
