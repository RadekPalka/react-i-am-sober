import { ChangeEvent } from 'react';

import { StyledDiv } from './StyledDiv';
import { StyledInput } from './StyledInput';
type AuthInputProps = {
	labelText: string;
	value: string;
	type: string;
	onChange: (value: string) => void;
};
export const AuthInput: React.FC<AuthInputProps> = ({
	labelText,
	value,
	type,
	onChange,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};
	return (
		<StyledDiv>
			<label htmlFor='login'>{labelText}</label>
			<StyledInput value={value} onChange={handleChange} type={type}/>
		</StyledDiv>
	);
};