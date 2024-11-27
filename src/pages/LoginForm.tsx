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
import { RememberMeCheckbox } from '../components/RememberMeCheckbox';
import { isNetworkOrServerError } from '../clients/ErrorHandlingUtils';
import { Link } from '../types/Link';
import { NavBar } from '../components/NavBar';
import { PositioningContainer } from '../components/PositioningContainer';

export const LoginForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isRemembered, setIsRemembered] = useState(false);
	const [isFormEnabled, setIsFormEnabled] = useState(true);
	const navigate = useNavigate();

	document.title = 'Zaloguj się';

	const navBarElements: Link[] = [
		{
			id: 0,
			type: 'link',
			label: 'Zarejestruj się',
			to: '/registration-page',
		},
		{
			id: 1,
			type: 'link',
			label: 'Strona główna',
			to: '/',
		},
	];

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
				if (isNetworkOrServerError(error)) {
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
				<NavBar links={navBarElements} />
			</header>
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Strona logowania</StyledH1>
				</HeadingContainer>
				<StyledForm onSubmit={handleForm} $width='330px'>
					<PositioningContainer>
						<AuthInput
							disabled={!isFormEnabled}
							value={login}
							labelText='Login'
							onChange={(value) => setLogin(value)}
							type='text'
							id='login'
						/>
					</PositioningContainer>
					<PositioningContainer>
						<AuthInput
							disabled={!isFormEnabled}
							value={password}
							labelText='Hasło'
							onChange={(value) => setPassword(value)}
							type='password'
							id='password'
						/>
					</PositioningContainer>
					<PositioningContainer $width='160px'>
						<RememberMeCheckbox
							isCheckboxEnabled={isFormEnabled}
							isRemembered={isRemembered}
							setIsRemembered={setIsRemembered}
						/>
					</PositioningContainer>
					<PositioningContainer>
						<StyledButton
							type='submit'
							disabled={!isFormEnabled}
							$margin='5px auto'
						>
							Zaloguj się
						</StyledButton>
					</PositioningContainer>
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
