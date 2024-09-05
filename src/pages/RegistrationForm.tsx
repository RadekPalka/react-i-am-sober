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
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';

export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const loginLabelText = 'Podaj swój login';
	const passwordLabelText = 'Podaj swoje hasło';
	const confirmPasswordLabelText = 'Potwierdź hasło';

	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const minLoginLength = 4;

		if (!validateInputLength(login, minLoginLength)) {
			return toast.error('Login musi mieć co najmniej 4 znaki');
		} else if (!validateInput(password, PASSWORD_REGEX)) {
			return toast.error('Hasło musi zawierać znak specjalny, literą i cyfrę');
		} else if (!compareStrings(password, confirmPassword)) {
			return toast.error(
				'Hasła nie są zgodne. Proszę upewnić się, że oba hasła są identyczne.'
			);
		}
		setIsSubmitting((prevState) => !prevState);
		createAccount(login, password, navigate);
	};
	return (
		<>
			<header>
				<StyledNav $justifyContent='end'>
					<StyledUl>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/'>Strona główna</StyledLink>
						</StyledLi>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/login-page'>Zaloguj się</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
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
