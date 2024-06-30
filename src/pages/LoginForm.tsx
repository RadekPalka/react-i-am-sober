import { StyledForm } from '../components/StyledForm';
import { StyledInput } from '../components/StyledInput';
import { StyledH1 } from '../components/StyledH1';
import { StyledSection } from '../components/StyledSection';
import { AuthInput } from '../components';
import { handleChange } from '../utils/handleChange';

import { useState } from 'react';

export const LoginForm: React.FC = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	return (
		<StyledSection>
			<StyledH1>Strona logowania</StyledH1>
			<StyledForm>
				<AuthInput
					value={login}
					labelText='Login'
					onChange={(value) => handleChange(setLogin, value)}
					type='text'
				/>
				<AuthInput
					value={password}
					labelText='Hasło'
					onChange={(value) => handleChange(setPassword, value)}
					type='password'
				/>
			</StyledForm>
		</StyledSection>
	);
};
