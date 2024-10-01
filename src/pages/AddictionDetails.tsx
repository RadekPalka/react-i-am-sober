import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addIncident, getAddictionDetails } from '../clients/AccountClients';
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
import { CreateIncidentForm } from '../components/CreateIncidentForm';

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
	const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

	const [sobrietyDays, setSobrietyDays] = useState(0);
	const [addictionDetails, setAddictionDetails] =
		useState<AddictionDetailsProps>({
			id: 0,
			name: '',
			costPerDay: 0,
			detoxStartDate: '',
			lastIncidents: [],
			numberOfIncidents: 0,
			limitOfLastIncidents: 0,
			createdAt: '',
		});
	const navigate = useNavigate();
	const modalRef = useRef<HTMLDivElement | null>(null);

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
		const start = new Date(addictionDetails.detoxStartDate);
		const today = new Date();

		const differenceInMilliseconds = today.getTime() - start.getTime();

		return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
	};

	useEffect(() => {
		getAddictionDetails(Number(addictionId))
			.then((res) => {
				console.log(res.data);
				setFetchStatus('success');
				setAddictionDetails((prevDetails) => ({
					...prevDetails,
					...res.data,
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
				<StyledButton onClick={() => navigate(0)}></StyledButton>
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
					Data rozpoczęcia zmiany: {formatDate(addictionDetails.detoxStartDate)}
				</p>
				<p>Ilość dni w trzeźwości: {sobrietyDays}</p>
				<p>
					Ilość zaoszczędzonych pieniędzy:{' '}
					{sobrietyDays * addictionDetails.costPerDay} PLN
				</p>
				<StyledButton onClick={() => setIsIncidentModalOpen(true)}>
					Dodaj incydent
				</StyledButton>
				{isIncidentModalOpen && (
					<CreateIncidentForm
						min={addictionDetails.detoxStartDate}
						id={addictionId}
						setIsIncidentModalOpen={setIsIncidentModalOpen}
					/>
				)}
				<StyledButton
					onClick={() => {
						setIsModalOpen(true);
						console.log(modalRef.current);
						modalRef.current &&
							modalRef.current.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					Edytuj
				</StyledButton>
			</AddictionDetailsContainer>
			<div ref={modalRef}>
				{isModalOpen && (
					<EditAddictionForm
						name={addictionDetails.name}
						costPerDay={addictionDetails.costPerDay}
						detoxStartDate={addictionDetails.detoxStartDate}
						id={Number(addictionId)}
						setIsModalOpen={setIsModalOpen}
						setAddictionDetails={setAddictionDetails}
						createdAt={addictionDetails.createdAt}
					/>
				)}
			</div>
		</>
	);
};
