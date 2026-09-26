'use client';

import { Conditional } from '@/components/layout/conditional';
import { Stack } from '@/components/layout/stack';
import { NavigationItem } from '@/types/navigationCategory';
import { cn } from '@/utils/cn/cn';

interface CategoryTabsProps {
	navigationlist: NavigationItem[];
	menuIndex: number;
	setMenuIndex: (menuIndex: number) => void;
}
export const CategoryTabs = ({
	navigationlist,
	menuIndex,
	setMenuIndex,
}: CategoryTabsProps) => {
	return (
		<Stack as="nav" className="border-b-2 border-b-border-secondary pb-1.5">
			<Stack as="ul" direction="row" gap="lg" className="group/container mt-30">
				{navigationlist.map(({ id, label }, index) => (
					<li key={id}>
						<button
							onClick={() => {
								setMenuIndex(index);
							}}
							className={cn(
								'text-sm relative group block transition-colors duration-300',
								'group-hover/container:text-gray-400',
								'hover:text-black!',
							)}
						>
							{label}
							<Conditional test={menuIndex === index}>
								<span className="absolute left-0 -bottom-2 w-full h-0.5 bg-black transition-transform duration-300 origin-left"></span>
							</Conditional>
						</button>
					</li>
				))}
			</Stack>
		</Stack>
	);
};
