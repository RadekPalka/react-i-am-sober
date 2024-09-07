import { StyledForm } from '../components/StyledForm';
import React, { useEffect } from 'react';
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
import { getToken, saveToken } from '../clients/SessionTokenService';

export const LoginForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isRemembered, setIsRemembered] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getToken() && navigate('/dashboard');
	}, []);

	const validateInputs = () => {
		const minLoginLength = 4;

		if (!validateInputLength(login, minLoginLength)) {
			toast.error('Login musi mieć co najmniej 4 znaki');
			return false;
		} else if (!validateInput(password, PASSWORD_REGEX)) {
			toast.error('Hasło musi zawierać znak specjalny, literą i cyfrę');
			return false;
		}
		return true;
	};

	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		console.log('Logowanie');
		e.preventDefault();
		if (!validateInputs) return;
		setIsLoggingIn((prevState) => !prevState);
		loginAction(login, password)
			.then(function (response) {
				console.log(response);
				saveToken(isRemembered, response.data.sessionToken);

				navigate('/dashboard');
			})
			.catch(function (error) {
				console.log(error);
				if (error.response) {
					error.response.status === 401
						? toast.error('Zły login lub hasło')
						: toast.error(
								'Błąd z połączeniem sieciowym. Spróbuj ponownie później'
						  );
				} else {
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
				}
			});
	};
	return (
		<StyledSection>
			<HeadingContainer>
				<StyledH1>Strona logowania</StyledH1>
			</HeadingContainer>
			<StyledForm onSubmit={handleForm}>
				<AuthInput
					disabled={isLoggingIn}
					value={login}
					labelText='Login'
					onChange={(value) => setLogin(value)}
					type='text'
					id='login'
				/>
				<AuthInput
					disabled={isLoggingIn}
					value={password}
					labelText='Hasło'
					onChange={(value) => setPassword(value)}
					type='password'
					id='password'
				/>
				<label htmlFor='is-remembered'>Zapamiętaj mnie</label>
				<input
					disabled={isLoggingIn}
					type='checkbox'
					id='is-remembered'
					checked={isRemembered}
					onChange={() => setIsRemembered((value) => !value)}
				/>
				<StyledButton type='submit' disabled={isLoggingIn}>
					Zaloguj się
				</StyledButton>
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
