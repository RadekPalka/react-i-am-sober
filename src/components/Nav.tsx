import { StyledNav } from './StyledNav';
import { StyledLink } from './StyledLink';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import React from 'react';

export const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledUl>
				<StyledLi>
					<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
				</StyledLi>
				<StyledLi>
					<StyledLink to='/login-page'>Zaloguj się</StyledLink>
				</StyledLi>
			</StyledUl>
		</StyledNav>
	);
};
