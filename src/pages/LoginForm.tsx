import { StyledForm } from '../components/StyledForm';
import React from 'react';
import { StyledH1 } from '../components/StyledH1';
import { StyledSection } from '../components/StyledSection';
import { AuthInput } from '../components';
import { toast } from 'react-toastify';
import { StyledButton } from '../components/StyledButton';
import { FormEvent, useState } from 'react';
import { StyledAuthMessage } from '../components/StyledAuthMessage';
import { StyledLink } from '../components/StyledLink';
import { PASSWORD_REGEX } from '../utils/constans';
import { validateInput, validateInputLength } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { HeadingContainer } from '../components/HeadingContainer';
import { loginAction } from '../clients/AccountClients';

export const LoginForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isRemembered, setIsRemembered] = useState(false);

	const navigate = useNavigate();
	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const minLoginLength = 4;

		if (!validateInputLength(login, minLoginLength)) {
			return toast.error('Login musi mieć co najmniej 4 znaki');
		} else if (!validateInput(password, PASSWORD_REGEX)) {
			return toast.error('Hasło musi zawierać znak specjalny, literą i cyfrę');
		}

		loginAction(login, password, navigate);
	};
	return (
		<StyledSection>
			<HeadingContainer>
				<StyledH1>Strona logowania</StyledH1>
			</HeadingContainer>
			<StyledForm onSubmit={handleForm}>
				<AuthInput
					value={login}
					labelText='Login'
					onChange={(value) => setLogin(value)}
					type='text'
					id='login'
				/>
				<AuthInput
					value={password}
					labelText='Hasło'
					onChange={(value) => setPassword(value)}
					type='password'
					id='password'
				/>
				<label htmlFor='is-remembered'>Zapamiętaj mnie</label>
				<input
					type='checkbox'
					id='is-remembered'
					checked={isRemembered}
					onChange={() => setIsRemembered((value) => !value)}
				/>
				<StyledButton type='submit'>Zaloguj się</StyledButton>
			</StyledForm>
			<StyledAuthMessage>
				<span>Nie masz konta? </span>
				<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
			</StyledAuthMessage>
			<StyledAuthMessage>lub</StyledAuthMessage>
			<StyledAuthMessage>
				<span>Wróć do </span>
				<StyledLink to='/'>strony głównej</StyledLink>
			</StyledAuthMessage>
		</StyledSection>
	);
};
