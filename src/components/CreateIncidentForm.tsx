import React, { FormEvent, useState } from 'react';
import { StyledForm } from './StyledForm';
import { StyledInput } from './StyledInput';
import { StyledButton } from './StyledButton';
import { addIncident } from '../clients/AccountClients';
import { toast } from 'react-toastify';
import { removeToken } from '../clients/SessionTokenService';
import { useNavigate } from 'react-router-dom';
import { formatDateForInput } from '../clients/dateUtils';
import { IncidentType } from '../types/IncidentType';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';

type CreateIncidentFormProps = {
	min: string;
	id: string | undefined;
	closeModal: () => void;
	increaseNumberOfIncidents: () => void;
	createIncident: (newIncident: IncidentType) => void;
	isIDateDuplicated: (date: string) => boolean;
};

export const CreateIncidentForm: React.FC<CreateIncidentFormProps> = ({
	min,
	id,
	closeModal,
	increaseNumberOfIncidents,
	createIncident,
	isIDateDuplicated,
}) => {
	const [isFormDisabled, setIsFormDisabled] = useState(false);

	const navigate = useNavigate();
	const formatMinDate = formatDateForInput(new Date(min));
	const maxDate = new Date();
	maxDate.setDate(maxDate.getDate() - 1);
	const formatMaxDate = formatDateForInput(maxDate);

	const [incidentDate, setIncidentDate] = useState(formatMaxDate);
	const handleIncidentButton = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (id) {
			const formattedDate = new Date(incidentDate).toISOString();
			if (isIDateDuplicated(formattedDate)) {
				return toast.error('Incydent o tej dacie już istnieje');
			}
			setIsFormDisabled(true);
			addIncident(id, incidentDate)
				.then(() => {
					toast.success('Pomyślnie dodano incydent');
					increaseNumberOfIncidents();
					createIncident({ id: Number(id), incidentDate: formattedDate });
				})
				.catch((error) => {
					if (handleNetworkError(error)) {
						toast.error('Błąd połączneia sieciowego. Spróbuj ponownie później');
					} else if (error.response.status === 401) {
						removeToken();
						toast.error('Błąd autoryzacji');
						navigate('/login-page');
					} else {
						toast.error('Dane uzależnienie nie istnieje');
						navigate('/dashboard');
					}
				})
				.finally(() => {
					closeModal();
				});
		}
	};
	return (
		<StyledForm onSubmit={handleIncidentButton}>
			<StyledInput
				type='date'
				value={incidentDate}
				max={formatMaxDate}
				min={formatMinDate}
				disabled={isFormDisabled}
				onChange={(e) => setIncidentDate(e.target.value)}
			/>
			<StyledButton type='submit' disabled={isFormDisabled}>
				Dodaj
			</StyledButton>
			<StyledButton
				type='button'
				onClick={closeModal}
				disabled={isFormDisabled}
			>
				Anuluj
			</StyledButton>
		</StyledForm>
	);
};
