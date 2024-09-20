import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddictionDetails } from '../clients/AccountClients';
import { AddictionDetailsProps } from '../types/AddictionDetailsProps';
import { EditAddictionForm } from '../components/EditAddictionForm';

type status = 'loading' | 'success' | 'error';
export const AddictionDetails: React.FC = () => {
	const { addictionId } = useParams();
	const [fetchStatus, setFetchStatus] = useState<status>('loading');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sobrietyDays, setSobrietyDays] = useState(0);
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

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
	};

	const calculateSobrietyDays = () => {
		const start = new Date(addictionDetails.createdAt);
		const today = new Date();

		const differenceInMilliseconds = today.getTime() - start.getTime();

		return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
	};

	useEffect(() => {
		console.log(addictionId);

		const id = Number(addictionId?.slice(1, addictionId.length));

		getAddictionDetails(id)
			.then((res) => {
				setFetchStatus('success');
				setAddictionDetails((prevDetails) => ({
					...prevDetails,
					...res.data,
					createdAt: formatDate(res.data.createdAt),
				}));
			})
			.catch((error) => {
				setFetchStatus('error');
				console.log(error);
			});
	}, []);
	useEffect(() => {
		setSobrietyDays(calculateSobrietyDays());
	}, [addictionDetails]);
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
			<p>Dzienny koszt: {addictionDetails.costPerDay} PLN</p>
			<p>
				Data rozpoczęcia treźwienia: {formatDate(addictionDetails.createdAt)}
			</p>
			<p>Ilość dni w trzeźwości: {sobrietyDays}</p>
			<p>
				Ilość zaoszczędzonych pieniędzy:{' '}
				{sobrietyDays * addictionDetails.costPerDay}
			</p>
			<button onClick={() => setIsModalOpen(true)}>Edytuj</button>
			{isModalOpen && (
				<EditAddictionForm
					name={addictionDetails.name}
					costPerDay={addictionDetails.costPerDay}
					createdAt={addictionDetails.createdAt}
					id={Number(addictionId?.slice(1, addictionId.length))}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</>
	);
};
