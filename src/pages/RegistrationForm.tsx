import { useState } from 'react';
import { AuthInput } from '../components';
export const RegistrationForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
  const loginLabelText = 'Podaj swój login'
  const passwordLabelText = 'Podaj swoje hasło'
	return (
		<>
			<h1>Rejestracja</h1>
			<form>
				<AuthInput />
				<AuthInput />
			</form>
		</>
	);
};
