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
import api from '../api/api';
import { StyledLink } from '../components/StyledLink';
import { StyledAuthMessage } from '../components/StyledAuthMessage';

import { PASSWORD_REGEX } from '../utils/constans';
import { createAccount } from '../clients/AccountClients';

export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
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

		createAccount(login, password, navigate);
	};
	return (
		<StyledSection>
			<HeadingContainer>
				<StyledH1>Rejestracja</StyledH1>
			</HeadingContainer>
			<StyledForm onSubmit={handleForm}>
				<AuthInput
					value={login}
					labelText={loginLabelText}
					onChange={(value) => setLogin(value)}
					type='text'
					id='login'
				/>
				<AuthInput
					value={password}
					labelText={passwordLabelText}
					onChange={(value) => setPassword(value)}
					type='password'
					id='password'
				/>
				<AuthInput
					value={confirmPassword}
					labelText={confirmPasswordLabelText}
					onChange={(value) => setConfirmPassword(value)}
					type='password'
					id='confirm-password'
				/>
				<StyledButton type='submit'>Zarejestruj się</StyledButton>
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
	);
};
