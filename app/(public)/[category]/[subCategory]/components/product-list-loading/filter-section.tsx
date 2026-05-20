import { Shimmer } from "./shimer";

interface FilterSectionProps {
    width?:string;
}

export const FilterSection = ({ width = "w-24" }: FilterSectionProps) => (
  <div className="border-t border-gray-200 py-5">
    <div className="flex items-center justify-between">
      <Shimmer className={`h-3.5 ${width} rounded`} />
      <Shimmer className="h-3.5 w-3.5 rounded" />
    </div>
  </div>
);
