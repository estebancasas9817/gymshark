import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Text } from '../text';

export const BackButton = ({ text, href }: { text: string; href: string }) => {
	return (
		<Link href={href} className="flex flex-row items-center gap-2">
			<ChevronLeft size={18} />
			<Text as="span" className="underline font-bold">
				{text}
			</Text>
		</Link>
	);
};
