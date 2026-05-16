import { ChangeEvent } from 'react';

interface RadioButtonProps {
	inputs: [string, string][];
	name: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	checkedRadio: string | null;
}

export const RadioButton = ({
	inputs,
	name,
	handleChange,
	checkedRadio,
}: RadioButtonProps) => {
	return (
		<fieldset>
			{inputs.map(([key, label]) => (
				<div key={key} className="not-last:mb-6">
					<label className="text-sm text-gray-700 flex gap-2 cursor-pointer w-full">
						<input
							type="radio"
							name={name}
							value={key}
							onChange={handleChange}
							checked={key === checkedRadio}
							className="peer appearance-none w-5 h-5 rounded-full border border-gray-400
                    checked:bg-secondary
                   relative
                   after:content-[''] after:absolute after:inset-1
                   after:rounded-full after:bg-primary after:scale-0
                   checked:after:scale-100 after:transition-transform cursor-pointer"
						/>
						<span>{label}</span>
					</label>
				</div>
			))}
		</fieldset>
	);
};
