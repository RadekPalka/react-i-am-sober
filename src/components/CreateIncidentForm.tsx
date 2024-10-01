import React, { FormEvent, useState } from 'react';
import { StyledForm } from './StyledForm';
import { StyledInput } from './StyledInput';
import { StyledButton } from './StyledButton';
import { addIncident } from '../clients/AccountClients';
import { toast } from 'react-toastify';
import { removeToken } from '../clients/SessionTokenService';
import { useNavigate } from 'react-router-dom';

type CreateIncidentFormProps = {
	min: string;
	id: string | undefined;
	setIsIncidentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateIncidentForm: React.FC<CreateIncidentFormProps> = ({
	min,
	id,
	setIsIncidentModalOpen,
}) => {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const navigate = useNavigate();
	const formatMinDate = new Date(min)
		.toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
		.replaceAll(',', '');

	const formatMaxDate = new Date()
		.toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
		.replaceAll(',', '');
	const [incidentDate, setIncidentDate] = useState(formatMaxDate);
	const handleIncidentButton = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (id) {
			setIsButtonDisabled(true);
			addIncident(id, incidentDate)
				.then((res) => {
					console.log(res);
					toast.success('Pomyślnie dodano incydent');
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
					setIsButtonDisabled(false);
				});
		}
	};
	return (
		<StyledForm onSubmit={handleIncidentButton}>
			<StyledInput
				type='datetime-local'
				value={incidentDate}
				max={formatMaxDate}
				min={formatMinDate}
				disabled={isButtonDisabled}
				onChange={(e) => setIncidentDate(e.target.value)}
			/>
			<StyledButton type='submit' disabled={isButtonDisabled}>
				Dodaj
			</StyledButton>
			<StyledButton
				type='button'
				onClick={() => setIsIncidentModalOpen(false)}
				disabled={isButtonDisabled}
			>
				Anuluj
			</StyledButton>
		</StyledForm>
	);
};
