import { getNavigation } from '@/libs/firebase/db/navigation/get-navigation';
import { Header } from '../header';

export const HeaderWrapper = async () => {
	const navigationlist = await getNavigation();

	return <Header navigationlist={navigationlist} />;
};
