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

type CreateIncidentFormProps = {
	min: string;
	id: string | undefined;
	setIsIncidentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	increaseNumberOfIncidents: () => void;
	createIncident: (arr: IncidentType) => void;
	isIDateDuplicated: (date: string) => boolean;
};

export const CreateIncidentForm: React.FC<CreateIncidentFormProps> = ({
	min,
	id,
	setIsIncidentModalOpen,
	increaseNumberOfIncidents,
	createIncident,
	isIDateDuplicated,
}) => {
	const [isFormDisabled, setIsFormDisabled] = useState(false);

	const navigate = useNavigate();
	console.log(min);
	const formatMinDate = formatDateForInput(new Date(min));

	const formatMaxDate = formatDateForInput(new Date());

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
				.then((res) => {
					console.log(res);
					toast.success('Pomyślnie dodano incydent');
					increaseNumberOfIncidents();
					createIncident({ id: Number(id), incidentDate: formattedDate });
				})
				.catch((error) => {
					console.log(error);
					if (
						!error.response ||
						(error.response.status >= 500 && error.response.status < 600)
					) {
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
					setIsIncidentModalOpen(false);
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
				onClick={() => setIsIncidentModalOpen(false)}
				disabled={isFormDisabled}
			>
				Anuluj
			</StyledButton>
		</StyledForm>
	);
};
