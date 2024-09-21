import { Main } from '../components/';
import React, { useEffect } from 'react';

import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { StyledNav } from '../components/StyledNav';
import { getToken } from '../clients/SessionTokenService';
import { useNavigate } from 'react-router-dom';

export const MainPage: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		getToken() && navigate('/dashboard');
	}, []);

	return (
		<>
			<header>
				<StyledNav $justifyContent='end'>
					<StyledUl $justifyContent='end'>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
						</StyledLi>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c' $marginLeft='5px'>
							<StyledLink to='/login-page'>Zaloguj się</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</header>
			<Main />
		</>
	);
};
