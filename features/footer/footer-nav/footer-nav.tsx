import { Stack } from '@/components/layout/stack';
import { FooterNavLinks } from './footer-nav-links';

const sectionKeys = ['help', 'account', 'pages'];

export const FooterNav = () => {
	return (
		<Stack as="nav" className="basis-1/2">
			<Stack as="div" direction="row" gap="xl" className="gap-12">
				{sectionKeys.map((section) => (
					<FooterNavLinks key={section} section={section} />
				))}
			</Stack>
		</Stack>
	);
};
