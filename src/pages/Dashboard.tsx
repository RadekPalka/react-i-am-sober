import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect } from 'react';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../clients/AccountClients';
import { AddictionCard } from '../components/AddictionCard';
import { logout } from '../clients/AccountClients';
export const Dashboard: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	console.log(userData);
	const handleLogout = () => {
		logout(navigate);
	};
	useEffect(() => {
		!userData.id && getUserData(navigate, setUserData);
	}, []);
	if (!userData.id) {
		return <h1>Loading</h1>;
	}
	return (
		<>
			<StyledNav $justifyContent='end'>
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
						<button onClick={handleLogout}>Wyloguj się</button>
					</StyledLi>
				</StyledUl>
			</StyledNav>
			<HeadingContainer>
				{userData.login && <StyledH1>Witaj {userData.login}</StyledH1>}
				{userData.addictionType ? (
					<AddictionCard />
				) : (
					<StyledH1>
						Wygląda na to, że jeszcze nie dodałeś żadnego uzależnienia do
						monitorowania. Aby rozpocząć, kliknij poniższy link i wypełnij
						krótki formularz, który pomoże Ci śledzić swoje postępy.
					</StyledH1>
				)}
				<StyledNav $justifyContent='center'>
					<StyledUl>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/addiction-info'>
								Dodaj nowe uzależnienie
							</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</HeadingContainer>
		</>
	);
};
