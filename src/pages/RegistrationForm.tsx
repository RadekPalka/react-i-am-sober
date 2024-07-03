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
import { handleChange } from '../utils/handleChange';
import { StyledButton } from '../components/StyledButton';
import api from '../api/api';
import axios from 'axios';
import { PASSWORD_REGEX } from '../utils/constans';

export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();
	const loginLabelText = 'Podaj swój login';
	const passwordLabelText = 'Podaj swoje hasło';
	const confirmPasswordLabelText = 'Potwierdź hasło';

	const handleForm = async (e: FormEvent<HTMLFormElement>) => {
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
		axios
			.post(
				'https://mentoring-api.vercel.app/api/v1/account',
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
				toast.success('Rejestracja zakończona sukcesem');
				navigate('/login-page');
			})
			.catch(function (error) {
				console.log(error);
			});
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
					onChange={(value) => handleChange(setLogin, value)}
					type='text'
				/>
				<AuthInput
					value={password}
					labelText={passwordLabelText}
					onChange={(value) => handleChange(setPassword, value)}
					type='password'
				/>
				<AuthInput
					value={confirmPassword}
					labelText={confirmPasswordLabelText}
					onChange={(value) => handleChange(setConfirmPassword, value)}
					type='password'
				/>
				<StyledButton type='submit'>Zarejestruj się</StyledButton>
			</StyledForm>
		</StyledSection>
	);
};
