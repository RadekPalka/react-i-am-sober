import { ChangeEvent } from 'react';
import { useUserContext } from './UserContext';
import { StyledDiv } from './StyledDiv';
import { StyledInput } from './StyledInput';
import { UserData } from '../types/UserData';
export const PasswordInputRegistration: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState: UserData) => ({
			...prevState,
			password: e.target.value,
		}));
	};
	return (
		<StyledDiv>
			<label htmlFor='password'>Podaj swoje hasło</label>
			<StyledInput
				value={userData.password}
				onChange={handleChange}
				type='text'
				id='password'
			/>
		</StyledDiv>
	);
};
