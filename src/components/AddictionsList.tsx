import React from 'react';
import { AddictionCard } from './AddictionCard';
import { AddictionsListProps } from '../types/AddictionsListProps';
import { StyledButton } from './StyledButton';
import { deleteAddiction } from '../clients/AccountClients';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const AddictionsUl = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 100%;
	gap: 50px;
`;

export const AddictionsList: React.FC<AddictionsListProps> = ({
	userAddictions,
	setUserAddictions,
	isButtonDisabled,
	isPaginationButtonEnabled,
	setIsButtonDisabled,
	updateUserAddictions,
}) => {
	const removeAddiction = (id: number) => {
		deleteAddiction(id)
			.then((res) => {
				console.log(res);
				setUserAddictions((prevState) =>
					prevState.filter((el) => el.id !== id)
				);
				toast.success('Uzależnienie usunięto pomyślnie');
			})
			.catch((error) => {
				console.log(error);
				toast.error('Błąd połącznia. Spróbuj ponownie później');
			});
	};
	return (
		<div>
			<AddictionsUl>
				{userAddictions.map((addiction) => (
					<AddictionCard
						key={addiction.id}
						name={addiction.name}
						costPerDay={addiction.costPerDay}
						deadline={addiction.deadline}
						id={addiction.id}
						removeAddiction={removeAddiction}
					/>
				))}
			</AddictionsUl>
			{isPaginationButtonEnabled && (
				<StyledButton
					disabled={isButtonDisabled}
					onClick={() => {
						setIsButtonDisabled(true);

						updateUserAddictions();
					}}
				>
					Wczytaj kolejne
				</StyledButton>
			)}
		</div>
	);
};
