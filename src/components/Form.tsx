import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { StyledDiv } from './StyledDiv';
import { StyledForm } from './StyledForm';
import { StyledButton } from './StyledButton';
import { createAddiction } from '../clients/AccountClients';
import { useUserContext } from '../context/UserContext';
import { AddictionData } from '../types/AddictionData';

export const Form: React.FC = () => {
	const navigate = useNavigate();
	const { userData } = useUserContext();
	const [userAddiction, setUserAddiction] = useState<AddictionData>({
		addictionType: '',
		addictionDailyCost: 0,
		detoxStartDate: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(userData);
		createAddiction(userData, navigate);
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledDiv>
				<AddictionInput
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</StyledDiv>
			<StyledDiv>
				<DateInput
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</StyledDiv>
			<StyledDiv>
				<DailyCostInput />
			</StyledDiv>
			<StyledButton type='submit'>Dalej</StyledButton>
		</StyledForm>
	);
};
