import { AnnouncementBar } from '@/features/announcement-bar';
import { Header } from '@/features/header';
import { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="sticky top-0 z-30">
				<AnnouncementBar />
				<Header />
			</div>
			{children}
		</>
	);
};

export default PublicLayout;
