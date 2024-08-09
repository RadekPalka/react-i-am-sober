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
				<StyledUl >
				<StyledLi $color='black' $background='#d3d3d3' >
					<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
				</StyledLi>
				<StyledLi $color='white' $background='black' >
					<StyledLink to='/login-page'>Zaloguj się</StyledLink>
				</StyledLi>
			</StyledUl>
				</Nav>
			</header>
			<Header />
		</>
	);
};
