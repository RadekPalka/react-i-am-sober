import { FormEvent, useState } from 'react';
import { AuthInput } from '../components';
import { useNavigate } from 'react-router-dom';
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
		const minLoginLength = 3;
		return login.length > minLoginLength;
	};
	const validatePassword = (): boolean => {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};
	const validateConfirmPassword = (
		password: string,
		confirmPassword: string
	): boolean => {
		return password === confirmPassword;
	};
	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateLogin()) {
			return alert('Login musi mieć co najmniej 4 znaki');
		} else if (!validatePassword()) {
			return alert('Hasło musi zawierać znak specjalny, literą i cyfrę');
		} else if (validateConfirmPassword(password, confirmPassword)) {
			return alert(
				'Hasła nie są zgodne. Proszę upewnić się, że oba hasła są identyczne.'
			);
		}
		navigate('./login-page');
	};
	return (
		<section>
			<h1>Rejestracja</h1>
			<form onSubmit={handleForm}>
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
				<button type='submit'>Zarejestruj się</button>
			</form>
		</section>
	);
};
