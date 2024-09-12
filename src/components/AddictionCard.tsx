import React from 'react';
import { AddictionCardProps } from '../types/AddictionCardProps';

export const AddictionCard: React.FC<AddictionCardProps> = ({
	name,
	costPerDay,
	deadline,
}) => {
	return (
		<div>
			<h2>{name}</h2>
			<p>{costPerDay} PLN</p>
			{deadline && <p>{deadline}</p>}
			<button>Pokaż szczegóły</button>
			<button>Usuń</button>
		</div>
	);
};
