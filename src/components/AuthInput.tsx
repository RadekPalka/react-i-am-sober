import { ChangeEvent } from 'react';
import { StyledDiv } from './StyledDiv';
import { StyledInput } from './StyledInput';
import { AuthInputProps } from '../types/AuthInputProps';
export const AuthInput: React.FC<AuthInputProps> = ({
	labelText,
	value,
	type,
	id,
	onChange,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<StyledDiv>
			<label htmlFor={id}>{labelText}</label>
			<StyledInput value={value} onChange={handleChange} type={type} id={id} />
		</StyledDiv>
	);
};
