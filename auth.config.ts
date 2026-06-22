import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	providers: [],
	pages: {
		signIn: '/sign-in',
	},
	session: { strategy: 'jwt' },
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnMyAccount = nextUrl.pathname.startsWith('/account');
			const isOnOrders = nextUrl.pathname.startsWith('/orders');
			const isOnSignIn = nextUrl.pathname === '/sign-in';
			const isOnSignUp = nextUrl.pathname === '/sign-up';

			if (isOnMyAccount || isOnOrders) {
				if (isLoggedIn) return true;
				return false;
			}
			if ((isOnSignIn || isOnSignUp) && isLoggedIn) {
				return Response.redirect(new URL('/', nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
