'use client';

import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/utils/cn/cn';
import { ReactNode } from 'react';

interface ProductCollectionProps {
	sectionName: string;
	sectionDescription?: ReactNode;
	children: ReactNode;
	className?: string;
}
// cambiar el nombre a algo más común
export const ProductCollection = ({
	sectionName,
	sectionDescription,
	children,
	className,
}: ProductCollectionProps) => {
	return (
		<Container as="section" className={cn('ps-10 mx-0 mt-4', className)}>
			<div className="mb-10 mt-10">
				<Heading size="lg">{sectionName}</Heading>
				{sectionDescription}
			</div>
			{children}
		</Container>
	);
};
