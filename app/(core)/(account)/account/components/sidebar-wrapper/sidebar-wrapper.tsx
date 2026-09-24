import { auth } from '@/libs/auth/auth';
import React from 'react';
import { AccountSidebar } from '../account-sidebar';
import { getUser } from '@/libs/firebase/db/user/get-user';

export const SidebarWrapper = async () => {
	const session = await auth();
	const { email } = session?.user ?? {};
	const user = await getUser(email as string);

	return <AccountSidebar user={user} />;
};
