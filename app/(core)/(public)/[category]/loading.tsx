import { Recommendedkeletons } from '@/components/ui/recommended-skeletons';

const Pulse = ({ className }: { className?: string }) => (
	<div className={`animate-pulse bg-gray-200 rounded ${className ?? ''}`} />
);

export default function Loading() {
	return (
		<>
			<div className="animate-pulse bg-gray-200 rounded h-150 w-full relative">
				<Pulse className="w-60 bg-gray-300 h-6 absolute bottom-50 left-4 lg:left-12" />
				<Pulse className="w-90 bg-gray-300 h-6 absolute bottom-35 left-4 lg:left-12" />
				<Pulse className="w-40 bg-gray-300 h-6 absolute bottom-20 left-4 lg:left-12" />
			</div>
			<Recommendedkeletons />
		</>
	);
}
