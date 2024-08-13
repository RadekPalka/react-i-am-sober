import { StyledNav } from './StyledNav';

import React from 'react';
import { NavProps } from '../types/NavProps';

export const Nav: React.FC<NavProps> = ({ children }) => {
	return <StyledNav>{children}</StyledNav>;
};
