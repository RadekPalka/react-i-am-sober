import { ChangeEvent } from 'react';

import { StyledDiv } from './StyledDiv';
import { StyledInput } from './StyledInput';

export const AuthInput: React.FC = () => {
	return (
		<StyledDiv>
			<label htmlFor='login'>Podaj swój login</label>
			<StyledInput type='text' id='login' />
		</StyledDiv>
	);
};
