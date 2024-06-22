import { FormEvent, useState } from 'react';
import { AuthInput } from '../components';
export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const loginLabelText = 'Podaj swój login';
	const passwordLabelText = 'Podaj swoje hasło';
	const handleLoginChange = (value: string) => {
		setLogin(value);
	};

	const handlePasswordChange = (value: string) => {
		setPassword(value);
	};
	const validatePassword = (): boolean => {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};
	const validateLogin = () : boolean =>{
		const minLoginLength = 3;
		return login.length > minLoginLength;
	}
	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateLogin){
			return alert("Login musi mieć co najmniej 4 znaki")
		}
		else if (!validatePassword) {
			return alert('Hasło musi zawierać znak specjalny, literą i cyfrę');
		}
	};
	return (
		<>
			<h1>Rejestracja</h1>
			<form onSubmit={handleForm}>
				<AuthInput
					value={login}
					labelText={loginLabelText}
					onChange={handleLoginChange}
					type='text'
				/>
				<AuthInput
					value={password}
					labelText={passwordLabelText}
					onChange={handlePasswordChange}
					type='password'
				/>
				<button type='submit'>Zarejestruj się</button>
			</form>
		</>
	);
};
