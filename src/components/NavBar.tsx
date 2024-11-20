import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LogoutButton } from './LogoutButton';
import { Link } from '../types/Link';
import { HamburgerButton } from './HamburgerButton';
import { NavBarWrapper } from './NavBarWrapper';
import { NavList } from './NavList';
import { NavLink } from './NavLink';
import { NavItem } from './NavItem';

type Props = {
	links: Link[];
};

export const NavBar: React.FC<Props> = ({ links }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<NavBarWrapper>
			<HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</HamburgerButton>
			<NavList $isDisplay={isMenuOpen}>
				{links.map((el, index) => {
					if (el.type === 'link' && el.to) {
						return (
							<NavItem key={el.id}>
								<NavLink to={el.to}>{el.label}</NavLink>
							</NavItem>
						);
					} else if (el.type === 'logout-button') {
						return (
							<NavItem key={index}>
								<LogoutButton />
							</NavItem>
						);
					}
				})}
			</NavList>
		</NavBarWrapper>
	);
};
