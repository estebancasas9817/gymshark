'use client';

import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { capitalize } from '@/utils/capitalize/capitalize';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { BiLogOut } from 'react-icons/bi';

interface AccountSidebarProps {
	user: {
		email: string;
		lastName: string;
		name: string;
	} | null;
}

export const AccountSidebar = ({ user }: AccountSidebarProps) => {
	const t = useTranslations('Account.sidebar');
	const name = user?.name ?? 'Hey';
	const lastName = user?.lastName ?? 'Athlete';
	const fullName = `${capitalize(name)} ${capitalize(lastName)}`;

	const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signOut({ redirectTo: '/' });
	};

	return (
		<Stack className="mt-12 md:mt-20 lg:items-start" align="center">
			<Heading as="h2" className="text-lg md:text-2xl lg:text-3xl">
				{fullName}
			</Heading>
			{!!user && <Text as="span">{user.email}</Text>}
			<Link
				href={'/'}
				onClick={handleSignOut}
				className="flex items-center gap-2"
			>
				<BiLogOut />
				<Text as="span" className="font-bold">
					{t('signout')}
				</Text>
			</Link>
		</Stack>
	);
};
