import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddictionDetails } from '../clients/AccountClients';
import { AddictionDetailsProps } from '../types/AddictionDetailsProps';
import { EditAddictionForm } from '../components/EditAddictionForm';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { LogoutButton } from '../components/LogoutButton';
import styled from 'styled-components';
import { StyledButton } from '../components/StyledButton';
import { toast } from 'react-toastify';
import { removeToken } from '../clients/SessionTokenService';

const AddictionDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin: 0 auto;
`;
type status = 'loading' | 'success' | 'error';
export const AddictionDetails: React.FC = () => {
	const { addictionId } = useParams();
	const [fetchStatus, setFetchStatus] = useState<status>('loading');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sobrietyDays, setSobrietyDays] = useState(0);
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
	const navigate = useNavigate();

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
		getAddictionDetails(Number(addictionId))
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
				if (!error.response || error.response.status === 500) {
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
				}
				if (error.response.status === 401) {
					removeToken();
					toast.error('Błąd autoryzacji');
					navigate('/login-page');
				} else if (error.response.status === 404) {
					toast.error('Operacja się nie powiodła');
					navigate('/dashboard');
				}
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
				<StyledLink to={`/addiction/${addictionId}`}>Odśwież stronę</StyledLink>
			</>
		);
	}
	return (
		<>
			<header>
				<StyledNav $justifyContent='end'>
					<StyledUl $justifyContent='end' $width='300px'>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/dashboard'>Panel użytkownika</StyledLink>
						</StyledLi>
						<StyledLi $color='#2c2c2c' $background='transparent' $border='none'>
							<LogoutButton />
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</header>
			<AddictionDetailsContainer>
				<h1>{addictionDetails.name}</h1>
				<p>Dzienny koszt: {addictionDetails.costPerDay} PLN</p>
				<p>
					Data rozpoczęcia treźwienia: {formatDate(addictionDetails.createdAt)}
				</p>
				<p>Ilość dni w trzeźwości: {sobrietyDays}</p>
				<p>
					Ilość zaoszczędzonych pieniędzy:{' '}
					{sobrietyDays * addictionDetails.costPerDay} PLN
				</p>
				<StyledButton onClick={() => setIsModalOpen(true)}>Edytuj</StyledButton>
			</AddictionDetailsContainer>
			{isModalOpen && (
				<EditAddictionForm
					name={addictionDetails.name}
					costPerDay={addictionDetails.costPerDay}
					id={Number(addictionId)}
					setIsModalOpen={setIsModalOpen}
					setAddictionDetails={setAddictionDetails}
				/>
			)}
		</>
	);
};
