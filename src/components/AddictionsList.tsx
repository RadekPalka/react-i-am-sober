import React from 'react';
import { AddictionCard } from './AddictionCard';
import { AddictionsListProps } from '../types/AddictionsListProps';
import { StyledButton } from './StyledButton';
export const AddictionsList: React.FC<AddictionsListProps> = ({
	userAddictions,
	setUserAddictions,
	isButtonDisabled,
	isPaginationButtonEnabled,
	setIsButtonDisabled,
	updateUserAddictions,
}) => {
	const removeAddiction = (id: number) => {
		setUserAddictions((prevState) => prevState.filter((el) => el.id !== id));
	};
	return (
		<div>
			<ul>
				{userAddictions.map((addiction) => (
					<li key={addiction.id}>
						<AddictionCard
							name={addiction.name}
							costPerDay={addiction.costPerDay}
							deadline={addiction.deadline}
							id={addiction.id}
							removeAddiction={removeAddiction}
						/>
					</li>
				))}
			</ul>
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
