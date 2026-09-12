import { Stack } from '@/components/layout/stack';
import { FooterNavLinks } from './footer-nav-links';

const sectionKeys = ['help', 'account', 'pages'];

export const FooterNav = () => {
	return (
		<Stack as="nav" className="w-full lg:basis-1/2">
			<Stack
				as="div"
				direction="column"
				className="lg:flex-row gap-0 lg:gap-12"
			>
				{sectionKeys.map((section, index) => (
					<FooterNavLinks key={section} section={section} index={index} />
				))}
			</Stack>
		</Stack>
	);
};
