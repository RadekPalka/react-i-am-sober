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
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [sobrietyDays, setSobrietyDays] = useState(0);
	const [addictionDetails, setAddictionDetails] =
		useState<AddictionDetailsProps>({
			id: 0,
			name: '',
			costPerDay: 0,
			startDate: '',
			lastIncidents: [],
			numberOfIncidents: 0,
			limitOfLastIncidents: 0,
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
		const start = new Date(addictionDetails.startDate);
		const today = new Date();

		const differenceInMilliseconds = today.getTime() - start.getTime();

		return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
	};
	const handleIncidentButton = () => {
		if (addictionId) {
			setIsButtonDisabled(true);
			addIncident(addictionId)
				.then((res) => {
					console.log(res);
					toast.success('Pomyślnie dodano incydent');
				})
				.catch((error) => {
					console.log(error);
					if (
						!error.response ||
						(error.response.status >= 500 && error.response.status < 600)
					) {
						toast.error('Błąd połączneia sieciowego. Spróbuj ponownie później');
					} else if (error.response.status === 401) {
						removeToken();
						toast.error('Błąd autoryzacji');
						navigate('/login-page');
					} else {
						toast.error('Dane uzależnienie nie istnieje');
						navigate('/dashboard');
					}
				})
				.finally(() => {
					setIsButtonDisabled(false);
				});
		}
	};
	useEffect(() => {
		getAddictionDetails(Number(addictionId))
			.then((res) => {
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
				<p>Data rozpoczęcia zmiany: {formatDate(addictionDetails.startDate)}</p>
				<p>Ilość dni w trzeźwości: {sobrietyDays}</p>
				<p>
					Ilość zaoszczędzonych pieniędzy:{' '}
					{sobrietyDays * addictionDetails.costPerDay} PLN
				</p>
				<StyledButton onClick={handleIncidentButton}>
					Dodaj incydent
				</StyledButton>
				<StyledButton
					onClick={() => {
						setIsModalOpen(true);
						console.log(modalRef.current);
						modalRef.current &&
							modalRef.current.scrollIntoView({ behavior: 'smooth' });
					}}
					disabled={isButtonDisabled}
				>
					Edytuj
				</StyledButton>
			</AddictionDetailsContainer>
			<div ref={modalRef}>
				{isModalOpen && (
					<EditAddictionForm
						name={addictionDetails.name}
						costPerDay={addictionDetails.costPerDay}
						id={Number(addictionId)}
						setIsModalOpen={setIsModalOpen}
						setAddictionDetails={setAddictionDetails}
					/>
				)}
			</div>
		</>
	);
};
