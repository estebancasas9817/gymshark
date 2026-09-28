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
			{inputs.map(([key, label]) => {
				const isChecked = key === checkedRadio;

				return (
					<div key={key} className="not-last:mb-6">
						<label className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer w-full group">
							<input
								type="radio"
								name={name}
								value={key}
								onChange={handleChange}
								checked={isChecked}
								className="sr-only"
							/>

							<span className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
								<span
									className={`w-2.5 h-2.5 rounded-full bg-black transition-transform ${
										isChecked ? 'scale-100' : 'scale-0'
									}`}
								/>
							</span>

							<span>{label}</span>
						</label>
					</div>
				);
			})}
		</fieldset>
	);
};
