import { auth } from '@/libs/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
	title: {
		template: '%s | Fit Store',
		default: 'My Account | Fit Store',
	},
	robots: {
		index: false,
		follow: false,
	},
};

const AccountLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) {
		redirect('/sign-in');
	}

	return <>{children}</>;
};

export default AccountLayout;
