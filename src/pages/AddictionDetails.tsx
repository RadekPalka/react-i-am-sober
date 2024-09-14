import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
type status = 'loading' | 'success' | 'error';
export const AddictionDetails: React.FC = () => {
	const { addictionId } = useParams();
	const [fetchStatus, setFetchStatus] = useState<status>('loading');
	const navigate = useNavigate();
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

		const id = Number(addictionId?.slice(1, addictionId.length));

		getAddictionDetails(id)
			.then((res) => {
				setFetchStatus('success');
				setAddictionDetails(res.data);
			})
			.catch((error) => {
				setFetchStatus('error');
				console.log(error);
			});
	}, []);

	if (fetchStatus === 'loading') {
		return <h1>Loading</h1>;
	} else if (fetchStatus === 'error') {
		return (
			<>
				<h1>Błąd z połączeniem sieciowym. Spróbuj ponownie później</h1>
				<button onClick={() => navigate(`/addiction/${addictionId}`)}>
					Odśwież stronę
				</button>
			</>
		);
	}
	return (
		<>
			<h1>{addictionDetails.name}</h1>
		</>
	);
};
