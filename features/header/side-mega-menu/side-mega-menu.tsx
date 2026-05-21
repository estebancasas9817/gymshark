'use client';

import { Stack } from '@/components/layout/stack';
import { NavigationCategory } from '@/types/navigationCategory';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SideMegaMenuProps {
	menu: NavigationCategory[];
	handleOnMouseLeave: () => void;
}

export const SideMegaMenu = ({
	menu,
	handleOnMouseLeave,
}: SideMegaMenuProps) => {
	return (
		<div className="bg-black/40 backdrop-blur-sm z-100 absolute w-full">
			<div
				className="bg-secondary border-t border-gray-200 w-73 h-screen px-10 pt-12"
				onMouseLeave={handleOnMouseLeave}
			>
				<Stack as="nav">
					<Stack as="ul" gap="lg">
						{menu?.map(({ id, href, label }) => (
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
			</div>
		</div>
	);
};
