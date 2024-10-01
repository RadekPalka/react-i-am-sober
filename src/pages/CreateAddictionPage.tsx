import { CreateAddictionForm } from '../components/CreateAddictionForm';
import { useEffect, useState } from 'react';
import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { fetchUserData } from '../clients/AccountClients';
import { StyledNav } from '../components/StyledNav';
import { StyledLi } from '../components/StyledLi';
import { StyledUl } from '../components/StyledUl';
import { getToken, removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
import { LogoutButton } from '../components/LogoutButton';
export const CreateAddictionPage: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'success'
	);
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
					if (
						!error.response ||
						(error.response.status >= 500 && error.response.status < 600)
					) {
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
			<StyledNav $justifyContent='end'>
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='transparent' $border='none'>
						<LogoutButton />
					</StyledLi>
				</StyledUl>
			</StyledNav>
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Witaj {userData.username}</StyledH1>
				</HeadingContainer>

				<CreateAddictionForm />
			</StyledSection>
		</>
	);
};
