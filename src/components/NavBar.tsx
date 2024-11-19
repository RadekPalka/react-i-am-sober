import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { StyledLink } from './StyledLink';
import { LogoutButton } from './LogoutButton';
import { Links } from '../types/Links';
import { HamburgerButton } from './HamburgerButton';
import { NavBarWrapper } from './NavBarWrapper';
import { NavList } from './NavList';

type Props = {
	linksObj: Links;
};

export const NavBar: React.FC<Props> = ({ linksObj }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<NavBarWrapper $justifyContent={linksObj.styles.navJustifyContent}>
			<HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</HamburgerButton>
			<NavList $justifyContent='end' $isDisplay={isMenuOpen}>
				{linksObj.elements.map((el, index) => {
					if (el.type === 'link' && el.to) {
						return (
							<li key={index}>
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
							</li>
						);
					} else if (el.type === 'logout-button') {
						return (
							<li key={index}>
								<LogoutButton
									width={linksObj.styles.width}
									height={linksObj.styles.height}
								/>
							</li>
						);
					}
				})}
			</NavList>
		</NavBarWrapper>
	);
};
