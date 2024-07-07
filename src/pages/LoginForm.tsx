import { StyledForm } from '../components/StyledForm';

import { StyledH1 } from '../components/StyledH1';
import { StyledSection } from '../components/StyledSection';
import { AuthInput } from '../components';
import { toast } from 'react-toastify';
import { StyledButton } from '../components/StyledButton';
import { FormEvent, useState } from 'react';
import { StyledAuthMessage } from '../components/StyledAuthMessage';
import { StyledLink } from '../components/StyledLink';
import api from '../api/api';
import { validateInput, validateInputLength } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { HeadingContainer } from '../components/HeadingContainer';

export const LoginForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const minLoginLength = 4;
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!validateInputLength(login, minLoginLength)) {
			return toast.error('Login musi mieć co najmniej 4 znaki');
		} else if (!validateInput(password, passwordRegex)) {
			return toast.error('Hasło musi zawierać znak specjalny, literą i cyfrę');
		}

		api
			.post(
				'/account/login',
				{
					username: login,
					password: password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(function (response) {
				console.log(response);
				localStorage.setItem('sessionToken', response.data.sessionToken);
				navigate('/addiction-info');
			})
			.catch(function (error) {
				console.log(error);
				console.log('Kod błędu: ' + error.response.status);
				error.response.status === 401
					? toast.error('Zły login lub hasło')
					: toast.error(
							'Błąd z połączeniem sieciowym. Spróbuj ponownie później'
					  );
			});
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
				/>
				<AuthInput
					value={password}
					labelText='Hasło'
					onChange={(value) => setPassword(value)}
					type='password'
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
