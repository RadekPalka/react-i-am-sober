import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect } from 'react';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
	fetchUserData,
	getPaginatedAddictions,
	logout,
} from '../clients/AccountClients';
import { AddictionCard } from '../components/AddictionCard';
import { StyledButton } from '../components/StyledButton';
import { getToken, removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
export const Dashboard: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	console.log(userData);

	const updateUserData = () => {
		const token = getToken();
		token &&
			fetchUserData(token)
				.then((response) => {
					setUserData(response.data);
					console.log(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					toast.error('Błąd autoryzacji');
				});
		token &&
			getPaginatedAddictions(token)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
	};

	useEffect(() => {
		!userData.id && updateUserData();
	}, []);

	const handleLogoutButton = () => {
		const token = getToken();
		token &&
			logout(token)
				.then((res) => {
					removeToken();
					console.log(res);
					toast.success('Zostałeś wylogowany(a) pomyślnie');
					navigate('/login-page');
				})
				.catch((error) => {
					console.log(error);
					toast.error('Błąd połączenia. Spróbuj ponownie później');
				});
	};
	if (!userData.id) {
		return <h1>Loading</h1>;
	}
	return (
		<>
			<StyledNav $justifyContent='end'>
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='transparent' $border='none'>
						<StyledButton onClick={handleLogoutButton}>
							Wyloguj się
						</StyledButton>
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
