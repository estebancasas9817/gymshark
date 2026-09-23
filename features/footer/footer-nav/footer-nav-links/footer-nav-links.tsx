'use client';

import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FOOTER_LINKS } from './constants';

interface FooterNavLinksProps {
	section: string;
}

export const FooterNavLinks = ({ section }: FooterNavLinksProps) => {
	const t = useTranslations('Footer.sections');
	const [isOpen, setIsOpen] = useState(false);
	const isDesktop = useBreakpoint('lg');
	const displayClassnames =
		(!isOpen && isDesktop) || (isOpen && !isDesktop) ? 'block' : 'hidden';

	const handleClick = () => {
		if (!isDesktop) {
			setIsOpen((prevState) => !prevState);
		}
	};

	useEffect(() => {
		if (isDesktop) {
			setIsOpen(false);
		}
	}, [isDesktop]);

	return (
		<Stack as="ul" gap="sm" className="gap-2  basis-1/3">
			<Stack
				direction="row"
				align="center"
				justify="between"
				className="border-x-0 border-t border-t-gray-200 py-4 lg:py-0 lg:border-0"
				onClick={handleClick}
			>
				<Text
					as="p"
					className="text-sm font-sans text-primary font-bold lg:mb-4"
				>
					{t(`${section}.title`)}
				</Text>
				<Conditional test={!isDesktop}>
					<Conditional test={isOpen} fallback={<Plus />}>
						<Minus />
					</Conditional>
				</Conditional>
			</Stack>
			{Object.keys(t.raw(`${section}.links`)).map((linkKey) => {
				const href = FOOTER_LINKS[section]?.[linkKey] || '#';
				const isInternal = linkKey === 'login' || linkKey === 'register';
				if (isInternal) {
					return (
						<Link
							href={href}
							key={linkKey}
							className={`text-sm text-gray-600 hover:text-primary ${displayClassnames} last:mb-4 lg:mb-0`}
						>
							{t(`${section}.links.${linkKey}`)}
						</Link>
					);
				}
				return (
					<li
						key={linkKey}
						className={`${displayClassnames} last:mb-4 lg:mb-0`}
					>
						<a
							href={href}
							target="_blank"
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
