import { StyledNav } from './StyledNav';
import { StyledLink } from './StyledLink';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import React from 'react';
import { NavProps } from '../types/NavProps';

export const Nav: React.FC<NavProps> = ({}) => {
	return (
		<StyledNav>
			<StyledUl >
				<StyledLi $color='black' $background='#d3d3d3' >
					<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
				</StyledLi>
				<StyledLi $color='white' $background='black' >
					<StyledLink to='/login-page'>Zaloguj się</StyledLink>
				</StyledLi>
			</StyledUl>
		</StyledNav>
	);
};
