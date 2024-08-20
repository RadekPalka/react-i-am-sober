import { Main } from '../components/';
import React from 'react';

import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { StyledNav } from '../components/StyledNav';
export const MainPage: React.FC = () => {
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
