import { Stack } from '@/components/layout/stack';
import React from 'react';
import { navigationLinks } from './constants';
import Link from 'next/link';

export const NavigationMenuList = () => {
	return (
		<Stack as="ul" className="mt-16">
			{navigationLinks.map(({ label, href }) => (
				<Link key={href} href={href} className="text-sm">
					{label}
				</Link>
			))}
		</Stack>
	);
};
