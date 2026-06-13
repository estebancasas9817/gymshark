import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	if (req.nextUrl.pathname.startsWith('/api/webhooks/stripe')) {
		return NextResponse.next();
	}

	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
