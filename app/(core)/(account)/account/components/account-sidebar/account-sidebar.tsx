'use client';

import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { BiLogOut } from 'react-icons/bi';

export const AccountSidebar = () => {
	const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signOut({ redirectTo: '/' });
	};

	return (
		<Stack className="mt-40">
			<Heading as="h2" className="text-3xl">
				Esteban Casas
			</Heading>
			<Text as="span">esteban@gmail.com</Text>
			<Link
				href={'/'}
				onClick={handleSignOut}
				className="flex items-center gap-2"
			>
				<BiLogOut />
				<Text as="span" className="font-bold">
					Sign Out
				</Text>
			</Link>
		</Stack>
	);
};
