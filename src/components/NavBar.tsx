import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { StyledNav } from './StyledNav';
import { StyledUl } from './NavBarStyledUl';
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
		<StyledNav $justifyContent={linksObj.styles.navJustifyContent}>
			<HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</HamburgerButton>
			<StyledUl $justifyContent='end' $isDisplay={isMenuOpen}>
				{linksObj.elements.map((el) => {
					if (el.type === 'link' && el.to) {
						return (
							<StyledLi>
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
							<StyledLi>
								<LogoutButton
									width={linksObj.styles.width}
									height={linksObj.styles.height}
								/>
							</StyledLi>
						);
					}
				})}
			</StyledUl>
		</StyledNav>
	);
};
