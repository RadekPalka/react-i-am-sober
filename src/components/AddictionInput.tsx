import { ChangeEvent } from 'react';
import { StyledInput } from './StyledInput';

import React from 'react';
import { AddictionInputsProps } from '../types/AddictionInputsProps';

export const AddictionInput: React.FC<AddictionInputsProps> = ({
	isInputDisabled,
	setUserAddiction,
	userAddiction,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserAddiction((prevState) => ({
			...prevState,
			addictionType: e.target.value,
		}));
	};
	return (
		<>
			<label htmlFor="addiction-choice'">Od czego jesteś uzależniony</label>
			<StyledInput
				id='addiction-choice'
				list='Addiction-type'
				value={userAddiction.addictionType}
				onChange={handleChange}
				disabled={isInputDisabled}
				required
			/>
			<datalist id='Addiction-type'>
				<option value='Alkohol' />
				<option value='Narkotyki' />
				<option value='Pornografia' />
				<option value='Hazard' />
			</datalist>
		</>
	);
};
