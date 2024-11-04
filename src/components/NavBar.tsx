import React, { ReactNode, useEffect, useState } from 'react';
import { StyledNav } from './StyledNav';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import { LogoutButton } from './LogoutButton';
import { HamburgerButton } from './HamburgerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type Props = {
	justifyContent: 'end' | 'center';
	isResponsive?: boolean;
	elements: ReactNode[];
	ulWidth: string;
	liBackground: string;
	liColor: string;
};

export const NavBar: React.FC<Props> = ({
	justifyContent,
	isResponsive,
	elements,
	ulWidth,
	liBackground,
	liColor,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		const closeMenu = () => {
			if (window.innerWidth > 767) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, []);
	return (
		<>
			<HamburgerButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
			>
				<FontAwesomeIcon icon={faBars} aria-hidden='true' />
			</HamburgerButton>

			<StyledNav
				$justifyContent={justifyContent}
				$isResponsive={isResponsive}
				$isVisible={isMenuOpen}
			>
				<StyledUl $width={ulWidth} $justifyContent={justifyContent}>
					{elements.map((el, index) => (
						<StyledLi
							key={index}
							$background={
								React.isValidElement(el) && el.type === LogoutButton
									? 'transparent'
									: liBackground
							}
							$color={liColor}
							$border={
								React.isValidElement(el) && el.type === LogoutButton
									? 'none'
									: undefined
							}
						>
							{el}
						</StyledLi>
					))}
				</StyledUl>
			</StyledNav>
		</>
	);
};
