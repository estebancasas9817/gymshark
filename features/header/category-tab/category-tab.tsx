'use client';

import { Stack } from '@/components/layout/stack';
import { NavigationCategory } from '@/types/navigationCategory';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CategoryTabProps {
	menu: NavigationCategory[];
}

export const CategoryTab = ({ menu }: CategoryTabProps) => {
	return (
		<Stack as="nav" className="mt-10">
			<Stack as="ul" gap="lg">
				{menu.map(({ id, href, label }) => (
					<li key={id}>
						<Link href={href} className="flex items-center group py-2">
							<span className="text-sm relative">
								{label}
								<span className="absolute left-0 -bottom-2 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
							</span>
							<ChevronRight size={18} className="ml-auto" />
						</Link>
					</li>
				))}
			</Stack>
		</Stack>
	);
};
