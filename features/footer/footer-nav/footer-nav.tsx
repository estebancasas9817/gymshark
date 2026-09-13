import { Stack } from '@/components/layout/stack';
import { FooterNavLinks } from './footer-nav-links';

const sectionKeys = ['help', 'account', 'pages'];

export const FooterNav = () => {
	return (
		<Stack as="nav" className="w-full">
			<Stack as="div" direction="column" className="lg:flex-row gap-0 lg:gap-2">
				{sectionKeys.map((section) => (
					<FooterNavLinks key={section} section={section} />
				))}
			</Stack>
		</Stack>
	);
};
