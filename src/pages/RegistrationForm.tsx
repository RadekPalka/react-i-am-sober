import { FormEvent, useState } from 'react';
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
import { isNetworkOrServerError } from '../clients/ErrorHandlingUtils';
import { NavBar } from '../components/NavBar';
import { Link } from '../types/Link';

export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const loginLabelText = 'Podaj swój login';
	const passwordLabelText = 'Podaj swoje hasło';
	const confirmPasswordLabelText = 'Potwierdź hasło';

	document.title = 'Zarejestruj się';
	const navBarElements: Link[] = [
		{
			id: 0,
			type: 'link',
			label: 'Zaloguj się',
			to: '/login-page',
		},
		{
			id: 1,
			type: 'link',
			label: 'Strona główna',
			to: '/',
		},
	];

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
				if (isNetworkOrServerError(error)) {
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
				<NavBar links={navBarElements} />
			</header>
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Rejestracja</StyledH1>
				</HeadingContainer>
				<StyledForm onSubmit={handleForm} $width='50%'>
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
					<StyledButton
						type='submit'
						disabled={isSubmitting}
						$margin='5px auto'
					>
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
