import { Container } from '@/components/layout/container';
import { Stack } from '@/components/layout/stack';
import { XpProgressTracker } from './components/xp-progress-tracker';
import { TierBenefits } from './components/tier-benefits';
import { GymsharkPlate } from '@/components/ui/gymshark-plate';
import { RecentOrders } from './components/recent-orders';
import { AccountShortcutCard } from './components/account-shortcut-card';
import { Text } from '@/components/ui/text';
import { FaAppStoreIos } from 'react-icons/fa';
import { ImAndroid } from 'react-icons/im';
import { TbTruckReturn } from 'react-icons/tb';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SidebarWrapper } from './components/sidebar-wrapper/sidebar-wrapper';
import { useTranslations } from 'next-intl';

export default function Page() {
	const t = useTranslations('Account.dashboard');

	return (
		<Container as="main" fullWidth>
			<Container
				as="section"
				fullWidth
				className="bg-[#dbdbdb] lg:h-160 relative"
			>
				<Stack
					direction="column"
					className="w-full px-6 md:px-16 lg:pt-20 lg:flex-row lg:items-start"
					justify="between"
					align="center"
				>
					<Suspense fallback={null}>
						<SidebarWrapper />
					</Suspense>
					<XpProgressTracker />
					<TierBenefits />
					<GymsharkPlate />
				</Stack>
				<GymsharkPlate isDesktopInstance />
			</Container>
			<Container as="section" fullWidth>
				<Stack
					className="p-4 md:p-8 lg:p-16 lg:gap-6 lg:flex-row"
					direction="column"
				>
					<ErrorBoundary fallback={<>{t('errors.recentOrders')}</>}>
						<Suspense>
							<RecentOrders />
						</Suspense>
					</ErrorBoundary>

					<Stack className="gap-6 basis-1/2">
						<AccountShortcutCard
							title={t('shortcuts.returns.title')}
							description={
								<Text className="mt-4 text-gray-700">
									{t('shortcuts.returns.description')}
								</Text>
							}
							icon={<TbTruckReturn size={40} />}
							href="https://us-gymshark.loopreturns.com/#/"
						/>
						<AccountShortcutCard
							title={t('shortcuts.gymsharkApp.title')}
							description={
								<Text className="mt-4 text-gray-700">
									{t('shortcuts.gymsharkApp.description')}
								</Text>
							}
							icon={<ImAndroid size={40} color="#3DDC84" />}
							href="https://gymshark.onelink.me/R4DB/webSearch1"
						/>
						<AccountShortcutCard
							title={t('shortcuts.trainingApp.title')}
							description={
								<Text className="mt-4 text-gray-700">
									{t('shortcuts.trainingApp.description')}
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
