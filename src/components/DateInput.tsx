import { ChangeEvent } from 'react';
import { StyledInput } from './StyledInput';
import { useUserContext } from '../context/UserContext';
import { UserData } from '../types/UserData';
import React from 'react';
export const DateInput: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState: UserData) => ({
			...prevState,
			addictionFreeDate: e.target.value,
		}));
	};
	return (
		<>
			<label htmlFor='addiction-free-date'>
				Wybierz datę uwolnienia się od uzależnienia
			</label>
			<StyledInput
				type='datetime-local'
				id='addiction-free-date'
				value={userData.addictionFreeDate}
				max={userData.addictionFreeDate}
				onChange={handleChange}
				required
			/>
		</>
	);
};
