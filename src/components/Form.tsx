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
		detoxStartDate: new Date()
			.toLocaleDateString('en-CA', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			})
			.replaceAll(',', ''),
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
				<DailyCostInput
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</StyledDiv>
			<StyledButton type='submit'>Dalej</StyledButton>
		</StyledForm>
	);
};
