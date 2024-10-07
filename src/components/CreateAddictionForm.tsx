import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { StyledDiv } from './StyledDiv';
import { StyledForm } from './StyledForm';
import { StyledButton } from './StyledButton';
import { createAddiction } from '../clients/AccountClients';
import { AddictionData } from '../types/AddictionData';
import { toast } from 'react-toastify';
import { removeToken } from '../clients/SessionTokenService';
import { formatDateForInput } from '../clients/dateUtils';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';

export const CreateAddictionForm: React.FC = () => {
	const navigate = useNavigate();
	const [isFormEnabled, setIsFormEnabled] = useState(true);
	const [userAddiction, setUserAddiction] = useState<AddictionData>({
		addictionType: '',
		addictionDailyCost: '',
		detoxStartDate: formatDateForInput(new Date()),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFormEnabled(false);
		createAddiction(userAddiction)
			.then(() => {
				toast.success('Uzależnienie dodano pomyślnie');
				navigate('/dashboard');
			})
			.catch((error) => {
				setIsFormEnabled(true);
				if (handleNetworkError(error)) {
					toast.error(
						'Wystąpił problem z serwerem. Proszę spróbować ponownie później.'
					);
				} else if (error.response.status === 400) {
					toast.error(
						'Wprowadzone dane są nieprawidłowe. Proszę sprawdzić formularz i spróbować ponownie.'
					);
				} else if (error.response.status === 401) {
					removeToken();
					toast.error('Błąd autoryzacji. Proszę zalogować się ponownie.');
					navigate('/login-page');
				}
			});
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledDiv>
				<AddictionInput
					isInputDisabled={!isFormEnabled}
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</StyledDiv>
			<StyledDiv>
				<DateInput
					isInputDisabled={!isFormEnabled}
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
					max={formatDateForInput(new Date())}
				/>
			</StyledDiv>
			<StyledDiv>
				<DailyCostInput
					isInputDisabled={!isFormEnabled}
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</StyledDiv>
			<StyledButton type='submit' disabled={!isFormEnabled}>
				Dodaj
			</StyledButton>
			<StyledButton
				type='button'
				disabled={!isFormEnabled}
				onClick={() => navigate('/dashboard')}
			>
				Anuluj
			</StyledButton>
		</StyledForm>
	);
};
