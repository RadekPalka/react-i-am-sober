import { ChangeEvent } from 'react';
import { StyledInput } from './StyledInput';
import React from 'react';
import { AddictionInputsProps } from '../types/AddictionInputsProps';
import { AddictionData } from '../types/AddictionData';
export const DailyCostInput: React.FC<AddictionInputsProps> = ({
	isInputDisabled,
	setUserAddiction,
	userAddiction,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserAddiction((prevState: AddictionData) => ({
			...prevState,
			addictionDailyCost: e.target.value,
		}));
	};
	return (
		<>
			<label htmlFor='daily-cost'>
				Ile pieniędzy dziennie traciłeś na uzależnienie?
			</label>
			<StyledInput
				type='number'
				id='daily-cost'
				min='0'
				value={userAddiction.addictionDailyCost}
				onChange={handleChange}
				disabled={isInputDisabled}
				required
			/>
		</>
	);
};
