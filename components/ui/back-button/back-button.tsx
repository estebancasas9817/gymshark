import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Text } from '../text';

export const BackButton = () => {
	return (
		<Link href="/account" className="flex flex-row items-center gap-2">
			<ChevronLeft size={18} />
			<Text as="span" className="underline font-bold">
				Back to account
			</Text>
		</Link>
	);
};
