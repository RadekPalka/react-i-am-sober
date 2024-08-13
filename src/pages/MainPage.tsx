import { Header } from '../components/';
import React from 'react';
import { Nav } from '../components/Nav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
export const MainPage: React.FC = () => {
	return (
		<>
			<header>
				<Nav>
					<StyledUl>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
						</StyledLi>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/login-page'>Zaloguj się</StyledLink>
						</StyledLi>
					</StyledUl>
				</Nav>
			</header>
			<Header />
		</>
	);
};
