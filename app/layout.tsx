import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CartProvider } from './context/cart-context';
import { SessionProvider } from 'next-auth/react';
import { Drawer } from '@/features/drawer';
import { WishlistProvider } from './context/wishlist-context';
import { DrawerProvider } from './context/drawer-context';
import { ToastProvider } from './context/toast-context';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	display: 'swap',
});

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		default: 'Gymshark Clone | Official Store',
		template: '%s | Gymshark Clone',
	},
	description:
		'Shop official Gymshark gym & workout clothing for men and women. High-quality workout tops, hoodies, leggings, shorts, and activewear accessories.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const messages = await getMessages();

	return (
		<html lang="en">
			<body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<SessionProvider>
						<ToastProvider>
							<DrawerProvider>
								<CartProvider>
									<WishlistProvider>
										<>
											<Drawer />
											{children}
										</>
									</WishlistProvider>
								</CartProvider>
							</DrawerProvider>
						</ToastProvider>
					</SessionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
