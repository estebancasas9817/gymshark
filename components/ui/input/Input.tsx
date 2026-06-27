'use client';

import { EyeOff, Eye, AlertCircle } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './input.module.css';
import { cn } from '@/utils/cn/cn';
import { Conditional } from '@/components/layout/conditional';

interface InputProps {
	type?: 'text' | 'email' | 'password' | 'date';
	placeholder: string;
	required?: boolean;
	name: string;
	min?: number;
	max?: number;
	error?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
	type = 'text',
	placeholder,
	required = false,
	name,
	min,
	max,
	error,
	onChange,
}: InputProps) => {
	const [isFloatingLabel, setIsFloatingLabel] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const isPassword = type === 'password';

	const togglePassword = () => setShowPassword(!showPassword);
	const handleOnFocus = () => setIsFloatingLabel(true);
	const handleOnBlur = () => {
		if (inputRef.current?.value) return;
		setIsFloatingLabel(false);
	};

	useEffect(() => {
		if (error) {
			handleOnBlur();
		}
	}, [error]);

	return (
		<div className={styles['input__form']}>
			<input
				type={isPassword && showPassword ? 'text' : type}
				className={cn(
					styles['input__floating'],
					error && styles['input__floating--error'],
				)}
				id={name}
				name={name}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				ref={inputRef}
				required={required}
				min={min}
				max={max}
				aria-invalid={!!error}
				aria-describedby={error ? `${name}-error` : undefined}
				onChange={onChange}
			/>
			<label
				className={cn(
					styles['input__floating-label'],
					isFloatingLabel && styles['input__floating-label--focus'],
					error && styles['input__floating-label--error'],
				)}
				htmlFor={name}
			>
				{placeholder}
			</label>

			<Conditional test={isPassword}>
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
			</Conditional>
			<Conditional test={!!error}>
				<p
					id={`${name}-error`}
					className={styles['input__error-message']}
					role="alert"
				>
					<AlertCircle size={18} fill="#bf2e35" color="white" />
					{error}
				</p>
			</Conditional>
		</div>
	);
};
