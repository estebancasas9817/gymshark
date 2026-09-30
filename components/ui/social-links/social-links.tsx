import { ReactNode } from 'react';

interface SocialLinksProps {
	logo: ReactNode;
	src: string;
	ariaLabel: string;
}
export const SocialLinks = ({ logo, src, ariaLabel }: SocialLinksProps) => {
	return (
		<figure className="bg-primary w-6 h-6 flex items-center justify-center rounded-full">
			<a href={src} target="_blank" aria-label={ariaLabel}>
				{logo}
			</a>
		</figure>
	);
};
