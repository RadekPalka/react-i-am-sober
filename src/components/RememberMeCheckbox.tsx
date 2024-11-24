import React from 'react';
import { StyledDiv } from './StyledDiv';
import { RememberMeCheckboxProps } from '../types/RememberMeCheckboxProps';

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
	isCheckboxEnabled,
	isRemembered,
	setIsRemembered,
}) => {
	return (
		<StyledDiv $width='200px' $margin='5px auto'>
			<label htmlFor='is-remembered'>Zapamiętaj mnie</label>
			<input
				disabled={!isCheckboxEnabled}
				type='checkbox'
				id='is-remembered'
				checked={isRemembered}
				onChange={() => setIsRemembered((value) => !value)}
			/>
		</StyledDiv>
	);
};
