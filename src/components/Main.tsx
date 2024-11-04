import { HeaderContent } from './HeaderContent';
import { StyledNav } from './StyledNav';
import React from 'react';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';

type PropsType = {
	isMobile: boolean;
};

export const Main: React.FC<PropsType> = ({ isMobile }) => {
	return (
		<main>
			<HeaderContent />

			<StyledNav $justifyContent='center'>
				<StyledUl>
					<StyledLi $color='black' $background='#d3d3d3'>
						<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
					</StyledLi>
					<StyledLi $color='white' $background='black'>
						<StyledLink to='/login-page'>Zaloguj się</StyledLink>
					</StyledLi>
				</StyledUl>
			</StyledNav>
		</main>
	);
};
