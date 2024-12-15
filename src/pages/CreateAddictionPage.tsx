import React from 'react';
import { CreateAddictionForm } from '../components/CreateAddictionForm';
import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { fetchUserData } from '../clients/AccountClients';

import { getToken, removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
import { useFetchState } from '../hooks/useFetchState';
import { isNetworkOrServerError } from '../clients/ErrorHandlingUtils';
import { NavBar } from '../components/NavBar';
import { Link } from '../types/Link';
import { StyledButton } from '../components/StyledButton';
export const CreateAddictionPage: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	const [fetchState, setFetchState] = useFetchState('Utwórz nowe uzależnienie');
	document.title = 'Dodaj uzależnienie';
	const navBarElements: Link[] = [
		{
			id: 0,
			type: 'link',
			to: '/dashboard',
			label: 'Panel główny',
		},
		{
			id: 2,
			type: 'logout-button',
		},
	];

	const updateUserData = () => {
		const token = getToken();

		if (!token) {
			toast.error('Błąd autoryzacji');
			navigate('/login-page');
		}
		fetchUserData()
			.then((response) => {
				setUserData(response.data);
				setFetchState('success');
			})
			.catch((error) => {
				if (isNetworkOrServerError(error)) {
					setFetchState('error');
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie póżniej');
				} else {
					removeToken();
					console.error('Error fetching data:', error);
					toast.error('Błąd autoryzacji');
					navigate('/login-page');
				}
			});
	};

	useEffect(() => {
		updateUserData();
	}, []);

	return (
		<>
			<header>
				<NavBar links={navBarElements} />
			</header>
			{fetchState === 'loading' && <h1>Loading</h1>}
			{fetchState === 'error' && (
				<>
					<h1>Błąd z połączeniem sieciowym. Spróbuj ponownie później</h1>
					<StyledButton onClick={() => navigate(0)}>Odśwież</StyledButton>
				</>
			)}
			{fetchState === 'success' && (
				<StyledSection>
					<HeadingContainer>
						<StyledH1>Witaj {userData.username}</StyledH1>
					</HeadingContainer>

					<CreateAddictionForm />
				</StyledSection>
			)}
		</>
	);
};
