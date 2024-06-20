import { ChangeEvent } from 'react';
import { useUserContext } from './UserContext';
import { StyledDiv } from './StyledDiv';
import { StyledInput } from './StyledInput';
import { UserData } from '../types/UserData';
export const AuthInput: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState: UserData) => ({
			...prevState,
			login: e.target.value,
		}));
	};
	return (
		<StyledDiv>
			<label htmlFor='login'>Podaj swój login</label>
			<StyledInput
				value={userData.login}
				onChange={handleChange}
				type='text'
				id='login'
			/>
		</StyledDiv>
	);
};
