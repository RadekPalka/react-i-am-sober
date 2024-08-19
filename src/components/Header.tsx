import styled from 'styled-components';
import { HeaderContent } from './HeaderContent';
import { StyledNav } from './StyledNav';
import React from 'react';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';
const StyledMain = styled.main`
	background-color: #e7e2dc;
`;

export const Header: React.FC = () => {
	return (
		<StyledMain>
			<StyledNav>
				<StyledUl>
					<StyledLi $color='black' $background='#d3d3d3'>
						<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
					</StyledLi>
					<StyledLi $color='white' $background='black'>
						<StyledLink to='/login-page'>Zaloguj się</StyledLink>
					</StyledLi>
				</StyledUl>
			</StyledNav>
			<HeaderContent />
		</StyledMain>
	);
};
