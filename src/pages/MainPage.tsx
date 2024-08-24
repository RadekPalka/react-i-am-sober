import { Main } from '../components/';
import React, { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { StyledNav } from '../components/StyledNav';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../clients/AccountClients';
export const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('sessionToken');
	const { setUserData } = useUserContext();
	useEffect(() => {
		token && verifyToken(navigate, setUserData, token);
		navigate('/dashboard');
	}, [navigate, token, setUserData]);

	return (
		<>
			<header>
				<StyledNav $justifyContent='end'>
					<StyledUl>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
						</StyledLi>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/login-page'>Zaloguj się</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</header>
			<Main />
		</>
	);
};
