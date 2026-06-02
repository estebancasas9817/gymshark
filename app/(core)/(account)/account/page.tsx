import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { XpProgressTracker } from './components/xp-progress-tracker';
import { TierBenefits } from './components/tier-benefits';
import { XpProgressBar } from './components/xp-progress-tracker/xp-counter/xp-progress-bar';
import { GymsharkPlate } from '@/components/ui/gymshark-plate';
import { AccountSidebar } from './components/account-sidebar';

export default function Page() {
	return (
		<Container fullWidth className="bg-[#dbdbdb] h-160 relative">
			<Stack direction="row" className="w-full px-16" justify="between">
				<AccountSidebar />
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
