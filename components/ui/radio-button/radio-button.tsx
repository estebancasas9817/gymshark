interface RadioButtonProps {
	inputs: [string, string][];
	name: string;
}

export const RadioButton = ({ inputs, name }: RadioButtonProps) => {
	return (
		<fieldset>
			{inputs.map(([key, label]) => (
				<div key={key} className="mb-6">
					<label className="text-sm text-gray-700 flex gap-2 cursor-pointer w-full">
						<input
							type="radio"
							name={name}
							value={label}
							className="peer appearance-none w-5 h-5 rounded-full border border-gray-400
                    checked:bg-secondary
                   relative
                   after:content-[''] after:absolute after:inset-1
                   after:rounded-full after:bg-primary after:scale-0
                   checked:after:scale-100 after:transition-transform"
						/>
						<span>{label}</span>
					</label>
				</div>
			))}
		</fieldset>
	);
};
