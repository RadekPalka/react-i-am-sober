import { StyledNav } from './StyledNav';
import { StyledLink } from './StyledLink';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import React from 'react';
import { NavProps } from '../types/NavProps';

export const Nav: React.FC<NavProps> = ({children}) => {
	return (
		<StyledNav>
			{children}
		</StyledNav>
	);
};
