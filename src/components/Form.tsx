import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { StyledDiv } from './StyledDiv';
import { StyledForm } from './StyledForm';
import { StyledButton } from './StyledButton';
import { createAddiction } from '../clients/AccountClients';
import { getToken } from '../clients/SessionTokenService';
import { AddictionData } from '../types/AddictionData';
import { toast } from 'react-toastify';

export const Form: React.FC = () => {
	const navigate = useNavigate();

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
		const token = getToken();
		createAddiction(userAddiction, token)
			.then((res) => {
				console.log(res);
				toast.success('Uzależnienie dodano pomyślnie');
				navigate('/dashboard');
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 400) {
					toast.error(
						'Wprowadzone dane są nieprawidłowe. Proszę sprawdzić formularz i spróbować ponownie.'
					);
				} else if (error.response.status === 401) {
					toast.error('Sesja wygasła. Proszę zalogować się ponownie.');
					navigate('/login-page');
				} else {
					toast.error(
						'Wystąpił problem z serwerem. Proszę spróbować ponownie później.'
					);
				}
			});
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
