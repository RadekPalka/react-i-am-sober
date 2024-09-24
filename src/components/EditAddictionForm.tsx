import React, { useState } from 'react';
import { StyledDiv } from './StyledDiv';
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

export const EditAddictionForm: React.FC<EditAddictionFormProps> = ({
	name,
	costPerDay,
	id,
	setIsModalOpen,
	setAddictionDetails,
}) => {
	const navigate = useNavigate();
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date
			.toLocaleDateString('en-CA', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			})
			.replaceAll(',', '');
	};
	const [userAddiction, setUserAddiction] = useState<AddictionData>({
		addictionType: name,
		addictionDailyCost: costPerDay,
		detoxStartDate: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log(userAddiction.addictionDailyCost);
		e.preventDefault();
		updateAddiction(
			id,
			userAddiction.addictionType,
			userAddiction.addictionDailyCost
		)
			.then((res) => {
				console.log(res);
				setAddictionDetails({
					...res.data,
					name: userAddiction.addictionType,
					costPerDay: userAddiction.addictionDailyCost,
				});
				toast.success('Aktualizacja przebiegła pomyślnie');
				setIsModalOpen(false);
			})
			.catch((error) => {
				if (!error.response || error.response.status === 500) {
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
			<StyledButton type='submit'>Edytuj</StyledButton>
			<StyledButton type='button' onClick={() => setIsModalOpen(false)}>
				Anuluj
			</StyledButton>
		</StyledForm>
	);
};
