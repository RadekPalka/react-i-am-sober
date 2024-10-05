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
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { RememberMeCheckbox } from '../components/RememberMeCheckbox';

export const LoginForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isRemembered, setIsRemembered] = useState(false);
	const [isFormEnabled, setIsFormEnabled] = useState(true);
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
		e.preventDefault();
		if (!validateInputs()) return;
		setIsFormEnabled(false);
		loginAction(login, password)
			.then(function (response) {
				saveToken(isRemembered, response.data.sessionToken);
				navigate('/dashboard');
			})
			.catch(function (error) {
				setIsFormEnabled(true);
				if (
					!error.response ||
					(error.response.status >= 500 && error.response.status < 600)
				) {
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
				} else if (error.response.status === 401) {
					toast.error('Zły login lub hasło');
				} else if (error.response.status === 400) {
					toast.error(
						'Wystąpił błąd podczas logowania. Proszę spróbować ponownie.'
					);
				}
			});
	};
	return (
		<>
			<header>
				<StyledNav $justifyContent='end'>
					<StyledUl $justifyContent='end' $width='300px'>
						<StyledLi $color='#2c2c2c' $background='#e3e3e3'>
							<StyledLink to='/'>Strona główna</StyledLink>
						</StyledLi>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c' $marginLeft='5px'>
							<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</header>
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Strona logowania</StyledH1>
				</HeadingContainer>
				<StyledForm onSubmit={handleForm}>
					<AuthInput
						disabled={!isFormEnabled}
						value={login}
						labelText='Login'
						onChange={(value) => setLogin(value)}
						type='text'
						id='login'
					/>
					<AuthInput
						disabled={!isFormEnabled}
						value={password}
						labelText='Hasło'
						onChange={(value) => setPassword(value)}
						type='password'
						id='password'
					/>
					<RememberMeCheckbox
						isCheckboxEnabled={isFormEnabled}
						isRemembered={isRemembered}
						setIsRemembered={setIsRemembered}
					/>
					<StyledButton type='submit' disabled={!isFormEnabled}>
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
		</>
	);
};
