import React from 'react';
import { AddictionCardProps } from '../types/AddictionCardProps';
import { useNavigate } from 'react-router-dom';

export const AddictionCard: React.FC<AddictionCardProps> = ({
	name,
	costPerDay,
	deadline,
	id,
}) => {
	const navigate = useNavigate();

	return (
		<div>
			<h2>{name}</h2>
			<p>{costPerDay} PLN</p>
			{deadline && <p>{deadline}</p>}
			<button onClick={() => navigate(`/addiction/:${id}`)}>
				Pokaż szczegóły
			</button>
			<button>Usuń</button>
		</div>
	);
};
