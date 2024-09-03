import { Form } from '../components';
import { useEffect } from 'react';
import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { logout, updateUserData } from '../clients/AccountClients';
import { StyledNav } from '../components/StyledNav';
import { StyledLi } from '../components/StyledLi';
import { StyledButton } from '../components/StyledButton';
import { StyledUl } from '../components/StyledUl';
export const AddictionInfoForm: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout(navigate);
	};
	useEffect(() => {
		!userData.id && updateUserData(navigate, setUserData);
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
