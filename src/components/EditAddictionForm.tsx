import React, { useState } from 'react';
import { StyledForm } from './StyledForm';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { StyledButton } from './StyledButton';
import { EditAddictionFormProps } from '../types/EditAddictionFormProps';
import { AddictionData } from '../types/AddictionData';
import { updateAddiction } from '../clients/AccountClients';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formatDateForInput } from '../clients/dateUtils';
import { isNetworkOrServerError } from '../clients/ErrorHandlingUtils';
import { RowContainer } from './RowContainer';

export const EditAddictionForm: React.FC<EditAddictionFormProps> = ({
	name,
	costPerDay,
	id,
	detoxStartDate,
	createdAt,
	closeModal,
	setAddictionDetails,
}) => {
	const maxDate = formatDateForInput(new Date(createdAt));

	const navigate = useNavigate();
	const [isFormEnabled, setIsFormEnabled] = useState(true);

	const [userAddiction, setUserAddiction] = useState<AddictionData>({
		addictionType: name,
		addictionDailyCost: costPerDay,
		detoxStartDate: formatDateForInput(new Date(detoxStartDate)),
		createdAt: createdAt,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setIsFormEnabled(false);
		e.preventDefault();
		id &&
			updateAddiction(
				id,
				userAddiction.addictionType,
				userAddiction.addictionDailyCost,
				userAddiction.detoxStartDate
			)
				.then(() => {
					setAddictionDetails((prevDetails) => ({
						...prevDetails,
						name: userAddiction.addictionType,
						costPerDay: Number(userAddiction.addictionDailyCost),
						detoxStartDate: userAddiction.detoxStartDate,
					}));
					toast.success('Aktualizacja przebiegła pomyślnie');
					closeModal();
				})
				.catch((error) => {
					if (isNetworkOrServerError(error)) {
						toast.error(
							'Wystąpił problem z serwerem. Proszę spróbować ponownie później.'
						);
					} else if (error.response.status === 400) {
						toast.error(
							'Wprowadzone dane są nieprawidłowe. Proszę sprawdzić formularz i spróbować ponownie.'
						);
					} else if (error.response.status === 401) {
						toast.error('Sesja wygasła. Proszę zalogować się ponownie.');
						navigate('/login-page');
					} else if (error.response.status === 404) {
						toast.error('Dane uzależnienie nie istnieje');
						navigate('/dashboard');
					}
				})
				.finally(() => setIsFormEnabled(true));
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<RowContainer>
				<AddictionInput
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
					isInputDisabled={!isFormEnabled}
				/>
			</RowContainer>
			<RowContainer>
				<DateInput
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
					isInputDisabled={!isFormEnabled}
					max={maxDate}
				/>
			</RowContainer>
			<RowContainer>
				<DailyCostInput
					setUserAddiction={setUserAddiction}
					userAddiction={userAddiction}
					isInputDisabled={!isFormEnabled}
				/>
			</RowContainer>
			<RowContainer>
				<StyledButton type='submit'>Zapisz</StyledButton>
				<StyledButton type='button' onClick={closeModal}>
					Anuluj
				</StyledButton>
			</RowContainer>
		</StyledForm>
	);
};
