import React from 'react';
import { StyledNav } from './StyledNav';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';
import { LogoutButton } from './LogoutButton';
import { Links } from '../types/Links';

type Props = {
	linksObj: Links;
};
export const NavBar: React.FC<Props> = ({ linksObj }) => {
	return (
		<StyledNav>
			<StyledUl>
				{linksObj.elements.map((el) => {
					if (el.type === 'link' && el.to) {
						return (
							<StyledLi>
								<StyledLink to={el.to}>{el.label}</StyledLink>
							</StyledLi>
						);
					} else if (el.type === 'logout-button') {
						return <LogoutButton />;
					}
				})}
			</StyledUl>
		</StyledNav>
	);
};
