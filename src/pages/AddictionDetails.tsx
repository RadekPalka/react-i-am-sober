import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAddictionDetails } from '../clients/AccountClients';

export const AddictionDetails: React.FC = () => {
	const { addictionId } = useParams();

	useEffect(() => {
		console.log(addictionId);
		if (addictionId) {
			const id = +addictionId?.slice(1, addictionId.length - 1);

			getAddictionDetails(id)
				.then((res) => console.log(res))
				.catch((error) => console.log(error));
		}
	}, []);

	return (
		<>
			<h1>{addictionId}</h1>
		</>
	);
};
