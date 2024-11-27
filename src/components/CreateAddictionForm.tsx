import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { StyledForm } from './StyledForm';
import { StyledButton } from './StyledButton';
import { createAddiction } from '../clients/AccountClients';
import { AddictionData } from '../types/AddictionData';
import { toast } from 'react-toastify';
import { removeToken } from '../clients/SessionTokenService';
import { formatDateForInput } from '../clients/dateUtils';
import { isNetworkOrServerError } from '../clients/ErrorHandlingUtils';
import { PositioningContainer } from './PositioningContainer';

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
				if (isNetworkOrServerError(error)) {
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
		<StyledForm onSubmit={handleSubmit} $width='520px'>
			<PositioningContainer>
				<AddictionInput
					isInputDisabled={!isFormEnabled}
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</PositioningContainer>
			<PositioningContainer>
				<DateInput
					isInputDisabled={!isFormEnabled}
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
					max={formatDateForInput(new Date())}
				/>
			</PositioningContainer>
			<PositioningContainer>
				<DailyCostInput
					isInputDisabled={!isFormEnabled}
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
				/>
			</PositioningContainer>
			<PositioningContainer $width='190px'>
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
			</PositioningContainer>
		</StyledForm>
	);
};
