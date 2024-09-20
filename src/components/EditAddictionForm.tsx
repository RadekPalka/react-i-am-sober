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

export const EditAddictionForm: React.FC<EditAddictionFormProps> = ({
	name,
	costPerDay,
	createdAt,
	id,
	setIsModalOpen,
	addictionDetails,
	setAddictionDetails,
}) => {
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const formattedDateTime = date
			.toLocaleDateString('en-CA', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			})
			.replaceAll(',', '');

		console.log(`${formattedDateTime}`);

		return `${formattedDateTime}`;
	};
	const [userAddiction, setUserAddiction] = useState<AddictionData>({
		addictionType: name,
		addictionDailyCost: costPerDay,
		detoxStartDate: formatDate(createdAt),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log(userAddiction.addictionDailyCost);
		e.preventDefault();
		updateAddiction(
			id,
			userAddiction.addictionType,
			userAddiction.addictionDailyCost,
			userAddiction.detoxStartDate
		)
			.then((res) => {
				console.log(res);
				setAddictionDetails({
					...addictionDetails,
					name: userAddiction.addictionType,
					costPerDay: userAddiction.addictionDailyCost,
					createdAt: userAddiction.detoxStartDate,
				});
				toast.success('Aktualizacja przebiegła pomyślnie');
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.log(error);
				toast.error('Bład połączenia');
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
