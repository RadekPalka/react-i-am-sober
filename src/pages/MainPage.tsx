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

export const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		getToken() && navigate('/dashboard');
	}, []);

	return (
		<>
			<header>
				<HamburgerButton
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
				>
					<FontAwesomeIcon icon={faBars} aria-hidden='true' />
					{isMenuOpen && (
						<ul>
							<li>
								<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
							</li>
							<li>
								<StyledLink to='/login-page'>Zaloguj się</StyledLink>
							</li>
						</ul>
					)}
				</HamburgerButton>
				<StyledNav $justifyContent='end'>
					<StyledUl $justifyContent='end'>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
						</StyledLi>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c' $marginLeft='5px'>
							<StyledLink to='/login-page'>Zaloguj się</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</header>
			<Main />
		</>
	);
};
