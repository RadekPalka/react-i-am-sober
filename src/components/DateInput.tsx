import { ChangeEvent } from 'react';
import { StyledInput } from './StyledInput';

import React from 'react';
import { AddictionInputsProps } from '../types/AddictionInputsProps';
import { AddictionData } from '../types/AddictionData';
export const DateInput: React.FC<AddictionInputsProps> = ({
	isInputDisabled,
	setUserAddiction,
	userAddiction,
	max,
}) => {
	console.log(max);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserAddiction((prevState: AddictionData) => ({
			...prevState,
			detoxStartDate: e.target.value,
		}));
	};
	return (
		<>
			<label htmlFor='addiction-free-date'>
				Wybierz datę uwolnienia się od uzależnienia
			</label>
			<StyledInput
				type='date'
				id='addiction-free-date'
				value={userAddiction.detoxStartDate}
				max={max}
				onChange={handleChange}
				disabled={isInputDisabled}
				required
			/>
		</>
	);
};
