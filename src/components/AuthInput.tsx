import { ChangeEvent } from 'react';
import { StyledInput } from './StyledInput';
import { AuthInputProps } from '../types/AuthInputProps';
import React from 'react';
export const AuthInput: React.FC<AuthInputProps> = ({
	labelText,
	value,
	type,
	id,
	disabled,
	onChange,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<>
			<label htmlFor={id}>{labelText}</label>
			<StyledInput
				value={value}
				onChange={handleChange}
				type={type}
				id={id}
				disabled={disabled}
			/>
		</>
	);
};
