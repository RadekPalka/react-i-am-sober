import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Main } from '../components/';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { StyledNav } from '../components/StyledNav';
import { getToken } from '../clients/SessionTokenService';
import { HamburgerButton } from '../components/HamburgerButton';
import { StyledUl } from '../components/StyledUl';
import { MobileNavBar } from '../components/MobileNavbar';

export const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
	}, [isMobile]);

	useEffect(() => {
		getToken() && navigate('/dashboard');
	}, []);

	return (
		<>
			<header>
				{isMobile && (
					<HamburgerButton
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
					>
						<FontAwesomeIcon icon={faBars} aria-hidden='true' />
					</HamburgerButton>
				)}
				{isMobile && isMenuOpen && (
					<MobileNavBar>
						<ul>
							<li>
								<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
							</li>
							<li>
								<StyledLink to='/login-page'>Zaloguj się</StyledLink>
							</li>
						</ul>
					</MobileNavBar>
				)}
				{!isMobile && (
					<StyledNav $justifyContent='end'>
						<StyledUl $justifyContent='end'>
							<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
								<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
							</StyledLi>
							<StyledLi
								$color='#e3e3e3'
								$background='#2c2c2c'
								$marginLeft='5px'
							>
								<StyledLink to='/login-page'>Zaloguj się</StyledLink>
							</StyledLi>
						</StyledUl>
					</StyledNav>
				)}
			</header>
			<Main />
		</>
	);
};
