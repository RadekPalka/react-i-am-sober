import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavBarStyledNav } from './NavBarStyledNav';
import { NavBarStyledUl } from './NavBarStyledUl';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';
import { LogoutButton } from './LogoutButton';
import { Links } from '../types/Links';
import { HamburgerButton } from './HamburgerButton';

type Props = {
	linksObj: Links;
};

export const NavBar: React.FC<Props> = ({ linksObj }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<NavBarStyledNav $justifyContent={linksObj.styles.navJustifyContent}>
			<HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</HamburgerButton>
			<NavBarStyledUl $justifyContent='end' $isDisplay={isMenuOpen}>
				{linksObj.elements.map((el, index) => {
					if (el.type === 'link' && el.to) {
						return (
							<StyledLi key={index}>
								<StyledLink
									to={el.to}
									$width={linksObj.styles.width}
									$height={linksObj.styles.height}
									$display={linksObj.styles.linkDisplay}
									$borderRadius={linksObj.styles.borderRadius}
									$backgroundColor={linksObj.styles.linkBackgroundColor}
									$color={linksObj.styles.linkColor}
									$underline='none'
								>
									{el.label}
								</StyledLink>
							</StyledLi>
						);
					} else if (el.type === 'logout-button') {
						return (
							<StyledLi key={index}>
								<LogoutButton
									width={linksObj.styles.width}
									height={linksObj.styles.height}
								/>
							</StyledLi>
						);
					}
				})}
			</NavBarStyledUl>
		</NavBarStyledNav>
	);
};
