interface ShimmerProps {
	className?: string;
}

export const Shimmer = ({ className }: ShimmerProps) => (
	<div className={`relative overflow-hidden bg-gray-100 ${className}`}>
		<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
	</div>
);
