import { Container } from '@/components/layout/container';
import { useTranslations } from 'next-intl';
import { DepartmentCard } from './deparment-card';
import { Stack } from '@/components/layout/stack';

export const ShopByDepartment = () => {
	const t = useTranslations('Departments');
	return (
		<Container as="section" className="mb-20">
			<Stack direction="row" gap="sm">
				{Object.keys(t.raw('departments')).map((key) => (
					<DepartmentCard
						key={key}
						title={t(`departments.${key}.label`)}
						href={t(`departments.${key}.href`)}
					/>
				))}
			</Stack>
		</Container>
	);
};
