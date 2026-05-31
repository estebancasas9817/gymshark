import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { XpProgressTracker } from './components/xp-progress-tracker';
import { TierBenefits } from './components/tier-benefits';
import { XpProgressBar } from './components/xp-progress-tracker/xp-counter/xp-progress-bar';
import { GymsharkPlate } from '@/components/ui/gymshark-plate';

export default function Page() {
	return (
		<Container fullWidth className="bg-[#dbdbdb] h-160 relative">
			<Stack direction="row" className="w-full px-16" justify="between">
				<div className="mt-40">
					<Heading as="h2" className="text-3xl">
						Esteban Casas
					</Heading>
					<Text as="span">esteban@gmail.com</Text>
				</div>
				<XpProgressTracker />
				<div>
					<TierBenefits />
				</div>
			</Stack>
			<XpProgressBar />
			<GymsharkPlate />
		</Container>
	);
}
