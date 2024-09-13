import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAddictionDetails } from '../clients/AccountClients';
type AddictionDetailsProps = {
	id: number;
	name: string;
	costPerDay: number;
	createdAt: string;
	deadline: string;
	lastIncidents: { id: number; createdAt: string }[];
	numberOfIncidents: number;
	limitOfLastIncidents: number;
};
export const AddictionDetails: React.FC = () => {
	const { addictionId } = useParams();
	const [addictionDetails, setAddictionDetails] =
		useState<AddictionDetailsProps>({
			id: 0,
			name: '',
			costPerDay: 0,
			createdAt: '',
			deadline: '',
			lastIncidents: [],
			numberOfIncidents: 0,
			limitOfLastIncidents: 0,
		});

	useEffect(() => {
		console.log(addictionId);
		if (addictionId) {
			const id = +addictionId?.slice(1, addictionId.length);

			getAddictionDetails(id)
				.then((res) => {
					setAddictionDetails(res.data);
				})
				.catch((error) => console.log(error));
		}
	}, []);

	return (
		<>
			<h1>{addictionDetails.name}</h1>
		</>
	);
};
