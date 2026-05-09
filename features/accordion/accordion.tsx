'use client';

import { Conditional } from '@/components/layout/conditional';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/utils/cn/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface AccordionProps {
	children: ReactNode;
	title: string;
	classNames?: string;
}

export const Accordion = ({ children, title, classNames }: AccordionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const handleClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className={cn('border-t-gray-300 border-t', classNames)}>
			<button
				onClick={handleClick}
				className={cn(
					'flex justify-between items-start w-full cursor-pointer',
					isExpanded && 'pb-6',
				)}
			>
				<Heading as="h2" className="text-sm">
					{title}
				</Heading>
				<Conditional
					test={isExpanded}
					fallback={<ChevronDown size={20} color="#949292" />}
				>
					<ChevronUp size={20} color="#949292" />
				</Conditional>
			</button>
			<Conditional test={isExpanded}>{children}</Conditional>
		</div>
	);
};
