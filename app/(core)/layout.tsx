import { AnnouncementBar } from '@/features/announcement-bar';
import { Footer } from '@/features/footer';
import { HeaderWrapper } from '@/features/header/header-wrapper';
import { ReactNode, Suspense } from 'react';

const CoreLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="sticky -top-0.5 z-30">
				<AnnouncementBar />
				<Suspense>
					<HeaderWrapper />
				</Suspense>
			</div>
			{children}
			<Footer />
		</>
	);
};

export default CoreLayout;
