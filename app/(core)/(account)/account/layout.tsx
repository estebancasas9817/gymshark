import { auth } from '@/libs/auth/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const AccountLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) {
		redirect('/sign-in');
	}

	return <>{children}</>;
};

export default AccountLayout;
