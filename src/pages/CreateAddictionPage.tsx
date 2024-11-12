import React from 'react';
import { CreateAddictionForm } from '../components/CreateAddictionForm';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { fetchUserData } from '../clients/AccountClients';

import { getToken, removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';

import { handleNetworkError } from '../clients/ErrorHanlingUtils';
import { NavBar } from '../components/NavBar';
import { Links } from '../types/Links';
export const CreateAddictionPage: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'success'
	);
	document.title = 'Dodaj uzależnienie';
	const navBarElements: Links = {
		elements: [
			{
				type: 'link',
				to: '/dashboard',
				label: 'Panel główny',
			},
			{
				type: 'logout-button',
			},
		],
		styles: {},
	};

	const updateUserData = () => {
		setStatus('loading');
		const token = getToken();
		token &&
			fetchUserData()
				.then((response) => {
					setUserData(response.data);
					setStatus('success');
				})
				.catch((error) => {
					if (handleNetworkError(error)) {
						setStatus('error');
						toast.error(
							'Błąd z połączeniem sieciowym. Spróbuj ponownie póżniej'
						);
					} else {
						removeToken();
						console.error('Error fetching data:', error);
						toast.error('Błąd autoryzacji');
						navigate('/login-page');
					}
				});
	};

	useEffect(() => {
		!userData.id && updateUserData();
	}, []);
	if (status === 'loading') {
		return <h1>Loading</h1>;
	} else if (status === 'error') {
		return <button onClick={() => navigate(0)}>Odśwież</button>;
	}
	return (
		<>
			<NavBar linksObj={navBarElements} />
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Witaj {userData.username}</StyledH1>
				</HeadingContainer>

				<CreateAddictionForm />
			</StyledSection>
		</>
	);
};
