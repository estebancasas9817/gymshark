import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.ctfassets.net' },
			{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
			{ protocol: 'https', hostname: 'res.cloudinary.com' },
		],
	},
};
export default withNextIntl(nextConfig);
