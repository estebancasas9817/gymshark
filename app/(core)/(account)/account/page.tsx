import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { XpProgressTracker } from './components/xp-progress-tracker';
import { TierBenefits } from './components/tier-benefits';
import { XpProgressBar } from './components/xp-progress-tracker/xp-counter/xp-progress-bar';
import { GymsharkPlate } from '@/components/ui/gymshark-plate';
import { AccountSidebar } from './components/account-sidebar';
import { RecentOrders } from './components/recent-orders';
import { AccountShortcutCard } from './components/account-shortcut-card';
import { Text } from '@/components/ui/text';
import { FaAppStoreIos } from 'react-icons/fa';
import { ImAndroid } from 'react-icons/im';
import { TbTruckReturn } from 'react-icons/tb';

export default function Page() {
	return (
		<Container as="main" fullWidth>
			<Container as="section" fullWidth className="bg-[#dbdbdb] h-160 relative">
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
			<Container as="section" fullWidth>
				<Stack className="p-16 gap-6" direction="row">
					<RecentOrders />
					<Stack className="gap-6 basis-1/2">
						<AccountShortcutCard
							title="RETURNS"
							description={
								<Text className="mt-4 text-gray-700">
									Quick, easy and simple returns with Loop Returns.
								</Text>
							}
							icon={<TbTruckReturn size={40} />}
							href="https://us-gymshark.loopreturns.com/#/"
						/>
						<AccountShortcutCard
							title="THE GYMSHARK APP"
							description={
								<Text className="mt-4 text-gray-700">
									Shop your faves, get exclusive drops, class bookings and more.
								</Text>
							}
							icon={<ImAndroid size={40} color="#3DDC84" />}
							href="https://gymshark.onelink.me/R4DB/webSearch1"
						/>
						<AccountShortcutCard
							title="THE TRAINING APP"
							description={
								<Text className="mt-4 text-gray-700">
									Choose your path, and train your way for free.
								</Text>
							}
							icon={<FaAppStoreIos size={40} color="#10AFFF" />}
							href="https://gymshark.onelink.me/iy1s/webAccount1"
						/>
					</Stack>
				</Stack>
			</Container>
		</Container>
	);
}
