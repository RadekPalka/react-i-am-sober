import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteIncident, getAddictionDetails } from '../clients/AccountClients';
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
import { formatDateForDisplay } from '../clients/dateUtils';
import { IncidentType } from '../types/IncidentType';
import { LastIncidentsList } from '../components/LastIncidentsList';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';

const AddictionDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin: 0 auto;
`;
type status = 'loading' | 'success' | 'error';
type ModalState = 'editAddiction' | 'incidentForm' | null;

export const AddictionDetails: React.FC = () => {
	const { addictionId } = useParams();
	const [fetchStatus, setFetchStatus] = useState<status>('loading');
	const [modalState, setModalState] = useState<ModalState>(null);
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
	const editModalRef = useRef<HTMLDivElement | null>(null);
	const incidentModalRef = useRef<HTMLDivElement | null>(null);
	const daysSinceDetoxStart = Math.floor(
		(new Date().getTime() -
			new Date(addictionDetails.detoxStartDate).getTime()) /
			(1000 * 60 * 60 * 24)
	);
	const sobrietyDays = daysSinceDetoxStart - addictionDetails.numberOfIncidents;
	const estimatedMonthlySavings =
		(30 - addictionDetails.numberOfIncidents) * addictionDetails.costPerDay;
	const estimatedAnnualSavings =
		(365 - addictionDetails.numberOfIncidents) * addictionDetails.costPerDay;

	const increaseNumberOfIncidents = useCallback(() => {
		setAddictionDetails((prev) => ({
			...prev,
			numberOfIncidents: prev.numberOfIncidents + 1,
		}));
	}, [addictionDetails.numberOfIncidents]);

	useEffect(() => {
		addictionId &&
			getAddictionDetails(addictionId)
				.then((res) => {
					setFetchStatus('success');
					setAddictionDetails((prevDetails) => ({
						...prevDetails,
						...res.data,
						numberOfIncidents: Number(res.data.numberOfIncidents),
					}));
				})
				.catch((error) => {
					setFetchStatus('error');
					if (handleNetworkError(error)) {
						toast.error(
							'Błąd z połączeniem sieciowym. Spróbuj ponownie później'
						);
					} else if (error.response.status === 401) {
						removeToken();
						toast.error('Błąd autoryzacji');
						navigate('/login-page');
					} else if (error.response.status === 404) {
						toast.error('Uzależnienie nie istnieje');
						navigate('/dashboard');
					}
				});
	}, []);

	const formatCurrency = (number: number): string => {
		return new Intl.NumberFormat('pl-PL', {
			style: 'currency',
			currency: 'PLN',
		}).format(number);
	};

	const createIncident = (newIncident: IncidentType) => {
		setAddictionDetails((prev) => ({
			...prev,
			lastIncidents: [...prev.lastIncidents, newIncident],
		}));
	};

	const isIDateDuplicated = (date: string) => {
		return addictionDetails.lastIncidents.some(
			(el) => el.incidentDate === date
		);
	};

	const removeIncident = (incidentId: number) => {
		addictionId &&
			deleteIncident(addictionId, incidentId)
				.then(() => {
					setAddictionDetails((prev) => ({
						...prev,
						numberOfIncidents: prev.numberOfIncidents - 1,
						lastIncidents: prev.lastIncidents.filter(
							(el) => el.id !== incidentId
						),
					}));
					toast.success('Incydent usunięty pomyślnie');
				})
				.catch((error) => {
					if (handleNetworkError(error)) {
						toast.error('Błąd połączenia sieciowego. Spróbuj ponownie później');
					} else if (error.response.status === 401) {
						toast.error('Błąd autoryzacji');
						removeToken();
						navigate('/login-page');
					} else if (error.response.status === 404) {
						toast.error('Uzależnienie nie istnieje');
						navigate('/dashboard');
					}
				});
	};

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
					Data rozpoczęcia zmiany:{' '}
					{formatDateForDisplay(new Date(addictionDetails.detoxStartDate))}
				</p>
				<p>Ilość dni ogółem: {daysSinceDetoxStart}</p>
				<p>Ilość dni w trzeźwości: {sobrietyDays}</p>
				<p>Ilość incydentów: {addictionDetails.numberOfIncidents}</p>
				<p>
					Ilość zaoszczędzonych pieniędzy:{' '}
					{formatCurrency(sobrietyDays * addictionDetails.costPerDay)}
				</p>
				{daysSinceDetoxStart < 30 && (
					<p>
						Prognozowane miesięczne oszczędności:{' '}
						{formatCurrency(estimatedMonthlySavings)}
					</p>
				)}
				{daysSinceDetoxStart < 365 && (
					<p>
						Prognozowane roczne oszczędności:{' '}
						{formatCurrency(estimatedAnnualSavings)}
					</p>
				)}
				<StyledButton
					onClick={() => {
						setModalState('editAddiction');
						editModalRef.current &&
							editModalRef.current.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					Edytuj
				</StyledButton>
				<div ref={editModalRef}>
					{modalState === 'editAddiction' && (
						<EditAddictionForm
							name={addictionDetails.name}
							costPerDay={addictionDetails.costPerDay}
							detoxStartDate={addictionDetails.detoxStartDate}
							id={addictionId}
							closeModal={() => setModalState(null)}
							setAddictionDetails={setAddictionDetails}
							createdAt={addictionDetails.createdAt}
						/>
					)}
				</div>
				<StyledButton
					onClick={() => {
						setModalState('incidentForm');
						incidentModalRef.current &&
							incidentModalRef.current.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					Dodaj incydent
				</StyledButton>
				{modalState === 'incidentForm' && (
					<CreateIncidentForm
						min={addictionDetails.detoxStartDate}
						id={addictionId}
						closeModal={() => setModalState(null)}
						increaseNumberOfIncidents={increaseNumberOfIncidents}
						createIncident={createIncident}
						isIDateDuplicated={isIDateDuplicated}
					/>
				)}
				{addictionDetails.lastIncidents.length > 0 && (
					<LastIncidentsList
						lastIncidents={addictionDetails.lastIncidents}
						removeIncident={removeIncident}
						buttonDisabled={modalState !== null}
					/>
				)}
			</AddictionDetailsContainer>
		</>
	);
};
