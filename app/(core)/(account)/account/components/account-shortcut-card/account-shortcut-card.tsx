import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface AccountShortcutCardProps {
	title: string;
	description?: ReactNode;
	icon?: ReactNode;
	href: string;
}
export const AccountShortcutCard = ({
	title,
	description,
	icon,
	href,
}: AccountShortcutCardProps) => {
	return (
		<a className="bg-gray-100 p-8 block" href={href} target="_blank">
			<Stack direction="row" align="center">
				{icon}
				<div>
					<Heading as="h6" className="text-md">
						{title}
					</Heading>
					{description}
				</div>
				<ChevronRight className="ml-auto" color="#444444" size={20} />
			</Stack>
		</a>
	);
};
