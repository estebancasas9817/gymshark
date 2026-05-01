import { PageProps } from '@/types/next';
import { DepartmentLayout } from '@/features/department-layout';
import NotFound from '@/app/not-found';

type RouteParams = { category: 'women' | 'men' };

const CATEGORY = { women: 'women', men: 'men' };

export default async function Page({ params }: PageProps<RouteParams>) {
	const routeParams = await params;
	if (
		CATEGORY.men === routeParams.category ||
		CATEGORY.women === routeParams.category
	) {
		return <DepartmentLayout department={routeParams.category} />;
	}
	return NotFound();
}
