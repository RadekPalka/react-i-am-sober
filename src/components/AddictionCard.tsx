import React from 'react';
import { AddictionCardProps } from '../types/AddictionCardProps';
import { getAddictionDetails } from '../clients/AccountClients';

export const AddictionCard: React.FC<AddictionCardProps> = ({
	name,
	costPerDay,
	deadline,
	id,
}) => {
	const handleDetailsButton = () => {
		getAddictionDetails(id)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<h2>{name}</h2>
			<p>{costPerDay} PLN</p>
			{deadline && <p>{deadline}</p>}
			<button onClick={handleDetailsButton}>Pokaż szczegóły</button>
			<button>Usuń</button>
		</div>
	);
};
