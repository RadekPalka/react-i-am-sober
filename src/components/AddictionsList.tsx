import React from 'react';
import { AddictionCard } from './AddictionCard';
import { AddictionsListProps } from '../types/AddictionsListProps';
import { StyledButton } from './StyledButton';
import { deleteAddiction } from '../clients/AccountClients';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { removeToken } from '../clients/SessionTokenService';
import { useNavigate } from 'react-router-dom';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';

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
	const navigate = useNavigate();
	const removeAddiction = (id: string) => {
		deleteAddiction(id)
			.then(() => {
				setUserAddictions((prevState) =>
					prevState.filter((el) => el.id !== id)
				);
				toast.success('Uzależnienie usunięto pomyślnie');
			})
			.catch((error) => {
				if (handleNetworkError(error)) {
					toast.error('Błąd połącznia. Spróbuj ponownie później');
				} else {
					toast.error('Błąd autoryzacji');
					removeToken();
					navigate('/login-page');
				}
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
