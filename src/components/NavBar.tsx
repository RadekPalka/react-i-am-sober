import React from 'react';
import { StyledNav } from './StyledNav';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';
import { LogoutButton } from './LogoutButton';
import { Links } from '../types/Links';
import { HamburgerButton } from './HamburgerButton';

type Props = {
	linksObj: Links;
};
export const NavBar: React.FC<Props> = ({ linksObj }) => {
	return (
		<StyledNav $justifyContent={linksObj.styles.navJustifyContent}>
			<HamburgerButton />
			<StyledUl $justifyContent='end'>
				{linksObj.elements.map((el) => {
					if (el.type === 'link' && el.to) {
						return (
							<StyledLi>
								<StyledLink
									to={el.to}
									$width={linksObj.styles.buttonsWidth}
									$height={linksObj.styles.buttonsHeight}
								>
									{el.label}
								</StyledLink>
							</StyledLi>
						);
					} else if (el.type === 'logout-button') {
						return (
							<LogoutButton
								width={linksObj.styles.buttonsWidth}
								height={linksObj.styles.buttonsHeight}
							/>
						);
					}
				})}
			</StyledUl>
		</StyledNav>
	);
};
