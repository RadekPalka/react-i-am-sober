import { Form } from '../components';
import { useEffect } from 'react';
import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { fetchUserData, logout } from '../clients/AccountClients';
import { StyledNav } from '../components/StyledNav';
import { StyledLi } from '../components/StyledLi';
import { StyledButton } from '../components/StyledButton';
import { StyledUl } from '../components/StyledUl';
import { getToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
export const AddictionInfoForm: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	const updateUserData = () => {
		const token = getToken();
		token &&
			fetchUserData(token)
				.then((response) => {
					setUserData(response.data);
					navigate('/dashboard');
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					toast.error('Błąd autoryzacji');
				});
	};
	const handleLogout = () => {
		const token = getToken();
		token && logout(token);
	};
	useEffect(() => {
		!userData.id && updateUserData();
	}, []);
	if (!userData.id) {
		return <h1>Loading</h1>;
	}
	return (
		<>
			<StyledNav $justifyContent='end'>
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='transparent' $border='none'>
						<StyledButton onClick={handleLogout}>Wyloguj się</StyledButton>
					</StyledLi>
				</StyledUl>
			</StyledNav>
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Witaj {userData.login}</StyledH1>
				</HeadingContainer>

				<Form />
			</StyledSection>
		</>
	);
};
