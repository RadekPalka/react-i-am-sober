import { CreateAddictionForm } from '../components/CreateAddictionForm';
import { useEffect } from 'react';
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
import { getToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
import { LogoutButton } from '../components/LogoutButton';
export const CreateAddictionPage: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	const updateUserData = () => {
		const token = getToken();
		token &&
			fetchUserData()
				.then((response) => {
					setUserData(response.data);
					navigate('/dashboard');
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					toast.error('Błąd autoryzacji');
				});
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
