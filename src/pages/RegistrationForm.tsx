import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthInput } from '../components';
import { StyledH1 } from '../components/StyledH1';
import { StyledForm } from '../components/StyledForm';
import { StyledSection } from '../components/StyledSection';
import { HeadingContainer } from '../components/HeadingContainer';
import api from '../api/api';
import axios from 'axios';

const StyledButton = styled.button`
	display: block;
	margin: 10px auto;
	background-color: #492618;
	color: #fff;
	padding: 10px 20px;
	border-radius: 20px;
	font-family: 'LXGW WenKai TC', cursive;
	font-weight: 300;
	font-style: normal;
`;
export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();
	const loginLabelText = 'Podaj swój login';
	const passwordLabelText = 'Podaj swoje hasło';
	const confirmPasswordLabelText = 'Potwierdź hasło';

	const handleChange = (
		callback: React.Dispatch<React.SetStateAction<string>>,
		value: string
	) => {
		callback(value);
	};
	const validateLogin = (): boolean => {
		const minLoginLength = 4;
		return login.length >= minLoginLength;
	};
	const validatePassword = (): boolean => {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};
	const validateConfirmPassword = (): boolean => {
		return password === confirmPassword;
	};
	const handleForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// if (!validateLogin()) {
		// 	return alert('Login musi mieć co najmniej 4 znaki');
		// } else if (!validatePassword()) {
		// 	return alert('Hasło musi zawierać znak specjalny, literą i cyfrę');
		// } else if (!validateConfirmPassword()) {
		// 	return alert(
		// 		'Hasła nie są zgodne. Proszę upewnić się, że oba hasła są identyczne.'
		// 	);
		//}
		axios
			.post('https://mentoring-api.vercel.app/api/v1/account', {
				username: 'halko',
				password: 'password',
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		// try {
		// 	const response = await axios.post(
		// 		'https://mentoring-api.vercel.app/api/v1/account',
		// 		{
		// 			login,
		// 			password,
		// 		}
		// 	);
		// 	console.log('Rejestracja udana:', response.data);
		// 	alert(response.data);
		// 	navigate('/login-page');
		// } catch (error) {
		// 	console.error('Błąd podczas rejestracji:', error.message);
		// 	alert('Rejestracja nie powiodła się. Spróbuj ponownie.');
		// }
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
