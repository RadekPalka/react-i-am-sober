import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthInput } from '../components';
import { StyledH1 } from '../components/StyledH1';
import { StyledForm } from '../components/StyledForm';
import { StyledSection } from '../components/StyledSection';
import { HeadingContainer } from '../components/HeadingContainer';
import {
	validateInput,
	compareStrings,
	validateInputLength,
} from '../utils/validation';

import { StyledButton } from '../components/StyledButton';
import React from 'react';
import { StyledLink } from '../components/StyledLink';
import { StyledAuthMessage } from '../components/StyledAuthMessage';

import { PASSWORD_REGEX } from '../utils/constans';
import { createAccount } from '../clients/AccountClients';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';
import { MobileNavBar } from '../components/MobileNavbar';
import { HamburgerButton } from '../components/HamburgerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const loginLabelText = 'Podaj swój login';
	const passwordLabelText = 'Podaj swoje hasło';
	const confirmPasswordLabelText = 'Potwierdź hasło';
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	document.title = 'Zarejestruj się';
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

	const validateInputs = () => {
		const minLoginLength = 4;

		if (!validateInputLength(login, minLoginLength)) {
			toast.error('Login musi mieć co najmniej 4 znaki');
			return false;
		} else if (!validateInput(password, PASSWORD_REGEX)) {
			toast.error('Hasło musi zawierać znak specjalny, literą i cyfrę');
			return false;
		} else if (!compareStrings(password, confirmPassword)) {
			toast.error(
				'Hasła nie są zgodne. Proszę upewnić się, że oba hasła są identyczne.'
			);
			return false;
		}
		return true;
	};
	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateInputs()) return;
		setIsSubmitting((prevState) => (prevState = true));
		createAccount(login, password)
			.then(function () {
				toast.success('Rejestracja zakończona sukcesem');
				navigate('/login-page');
			})
			.catch(function (error) {
				if (handleNetworkError(error)) {
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
				} else {
					toast.error('Podany login jest już zajęty');
				}
				setIsSubmitting((prevState) => (prevState = false));
			});
	};
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
								<StyledLink to='/'>Strona główna</StyledLink>
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
								<StyledLink to='/'>Strona główna</StyledLink>
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
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Rejestracja</StyledH1>
				</HeadingContainer>
				<StyledForm onSubmit={handleForm}>
					<AuthInput
						disabled={isSubmitting}
						value={login}
						labelText={loginLabelText}
						onChange={(value) => setLogin(value)}
						type='text'
						id='login'
					/>
					<AuthInput
						disabled={isSubmitting}
						value={password}
						labelText={passwordLabelText}
						onChange={(value) => setPassword(value)}
						type='password'
						id='password'
					/>
					<AuthInput
						disabled={isSubmitting}
						value={confirmPassword}
						labelText={confirmPasswordLabelText}
						onChange={(value) => setConfirmPassword(value)}
						type='password'
						id='confirm-password'
					/>
					<StyledButton type='submit' disabled={isSubmitting}>
						Zarejestruj się
					</StyledButton>
				</StyledForm>
				<StyledAuthMessage>
					<span>Masz już konto? </span>
					<StyledLink to='/login-page'>Zaloguj się</StyledLink>
				</StyledAuthMessage>
				<StyledAuthMessage>lub</StyledAuthMessage>
				<StyledAuthMessage>
					<span>Wróć do </span>
					<StyledLink to='/'>strony głównej</StyledLink>
				</StyledAuthMessage>
			</StyledSection>
		</>
	);
};
