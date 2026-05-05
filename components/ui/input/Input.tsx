'use client';

import { EyeOff, Eye } from 'lucide-react';
import { useRef, useState } from 'react';
import styles from './input.module.css';
import { cn } from '@/utils/cn/cn';

interface InputProps {
	type?: 'text' | 'email' | 'password' | 'date';
	placeholder: string;
	required?: boolean;
	name: string;
}
export const Input = ({
	type = 'text',
	placeholder,
	required = false,
	name,
}: InputProps) => {
	const [isFloatingLabel, setIsFloatingLabel] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === 'password';

	const togglePassword = () => setShowPassword(!showPassword);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleOnFocus = () => {
		setIsFloatingLabel(true);
	};
	const handleOnBlur = () => {
		if (inputRef.current?.value) return;
		setIsFloatingLabel(false);
	};
	return (
		<div className={styles['input__form']}>
			<input
				type={isPassword && showPassword ? 'text' : type}
				className={styles['input__floating']}
				id={name}
				name={name}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				ref={inputRef}
				required={required}
			/>
			<label
				className={cn(
					styles['input__floating-label'],
					isFloatingLabel && styles['algo'],
				)}
				htmlFor={name}
			>
				{placeholder}
			</label>
			{isPassword && (
				<button
					type="button"
					onClick={togglePassword}
					className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer h-full w-10"
				>
					{showPassword ? (
						<EyeOff size={20} className="absolute left-2 top-4" />
					) : (
						<Eye size={20} className="absolute left-2 top-4" />
					)}
				</button>
			)}
		</div>
	);
};
