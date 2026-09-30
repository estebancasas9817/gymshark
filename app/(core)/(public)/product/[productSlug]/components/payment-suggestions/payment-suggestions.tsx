import { Stack } from '@/components/layout/stack';
import { Text } from '@/components/ui/text';
import { GrPaypal } from 'react-icons/gr';
import { SiAfterpay, SiKlarna } from 'react-icons/si';

interface PaymentSuggestionsProps {
	price: number;
}

const AFTERPAY_HREF =
	'https://support.gymshark.com/en/articles/11184158-afterpay?_gl=1*z3s85c*_gcl_au*ODg2MTEzMDQ3LjE3NzQ1NzM1NzQ.*_ga*NTQ0MTY2NjI4LjE3NzQ1NzM1NzQ.*_ga_PQJ0N2K1QF*czE3NzY1Mzc5NzIkbzI4JGcwJHQxNzc2NTM3OTcyJGo2MCRsMCRoMA..';

export const PaymentSuggestions = ({ price }: PaymentSuggestionsProps) => {
	const payment = price / 4;

	return (
		<Stack align="center" justify="center" className="my-10" gap="lg">
			<Stack direction="row" align="center" gap="xs">
				<GrPaypal color="blue" />
				<Text as="p" variant="tertiary" className="text-xs text-gray-700">
					Pay in 4 interest-free payments of ${payment}
				</Text>
			</Stack>
			<Stack direction="row" gap="sm">
				<Text as="p" variant="tertiary" className="text-xs text-gray-700">
					Also available at checkout:
				</Text>
				<a
					href={AFTERPAY_HREF}
					target="_blank"
					className="flex gap-2"
					aria-label="Pay Later with Afterpay"
				>
					<SiKlarna aria-label="You can pay with klarma" />
					<SiAfterpay aria-label="You can pay with after pay" />
				</a>
			</Stack>
		</Stack>
	);
};
