import { ReactNode } from 'react';

interface SocialLinksProps {
	logo: ReactNode;
	src: string;
}
export const SocialLinks = ({ logo, src }: SocialLinksProps) => {
	return (
		<figure className="bg-primary w-6 h-6 flex items-center justify-center rounded-full">
			<a href={src} target="_blank">
				{logo}
			</a>
		</figure>
	);
};
