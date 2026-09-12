'use client';

import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

interface FooterNavLinksProps {
	section: string;
	index: number;
}
export const FooterNavLinks = ({ section, index }: FooterNavLinksProps) => {
	const t = useTranslations('Footer.sections');
	const [isOpen, setIsOpen] = useState(false);
	const isDesktop = useBreakpoint('lg');
	const displayClassnames = isOpen && !isDesktop ? 'block' : 'hidden';
	const lastChildStyles = index === 2 ? 'border-b border-b-gray-200' : '';

	const handleClick = () => {
		if (!isDesktop) {
			setIsOpen((prevState) => !prevState);
		}
	};

	return (
		<Stack as="ul" gap="sm" className="gap-2">
			<Stack
				direction="row"
				align="center"
				justify="between"
				className={`border-x-0 border-t ${lastChildStyles} border-t-gray-200 py-4 lg:py-0 lg:border-0`}
				onClick={handleClick}
			>
				<Text
					as="p"
					className="text-sm font-sans text-primary font-bold lg:mb-4"
				>
					{t(`${section}.title`)}
				</Text>
				<Conditional test={isOpen} fallback={<Plus />}>
					<Minus />
				</Conditional>
			</Stack>
			{Object.keys(t.raw(`${section}.links`)).map((linkKey) => {
				if (linkKey === 'login' || linkKey === 'register') {
					return (
						<Link
							href={`/${linkKey}`}
							key={linkKey}
							className={`text-sm text-gray-600 hover:text-primary ${isOpen && !isDesktop ? 'block' : 'hidden'}`}
						>
							{t(`${section}.links.${linkKey}`)}
						</Link>
					);
				}
				return (
					<li key={linkKey} className={displayClassnames}>
						<a
							href={`/${linkKey}`}
							className="text-sm text-gray-600 hover:text-primary"
						>
							{t(`${section}.links.${linkKey}`)}
						</a>
					</li>
				);
			})}
		</Stack>
	);
};
