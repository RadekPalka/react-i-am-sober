import React from 'react';
import { StyledDiv } from './StyledDiv';
import { RememberMeCheckboxProps } from '../types/RememberMeCheckboxProps';

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
	isLoggingIn,
	isRemembered,
	setIsRemembered,
}) => {
	return (
		<StyledDiv>
			<label htmlFor='is-remembered'>Zapamiętaj mnie</label>
			<input
				disabled={isLoggingIn}
				type='checkbox'
				id='is-remembered'
				checked={isRemembered}
				onChange={() => setIsRemembered((value) => !value)}
			/>
		</StyledDiv>
	);
};