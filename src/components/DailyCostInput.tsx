import { ChangeEvent } from 'react';
import { StyledInput } from '../styles/StyledInput';
import { useUserContext } from './UserContext';


export const DailyCostInput: React.FC = () => {
	const { userData, setUserData } = useUserContext()
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState) => ({
			...prevState,
			addictionDailyCost: Number(e.target.value),
		}));
	};
	return (
		<>
			<label htmlFor='daily-cost'>
				Ile pieniędzy dziennie traciłeś na uzależnienie?
			</label>
			<StyledInput
				type='number'
				id='daily-cost'
				min='0'
				value={userData.addictionDailyCost || ''}
				onChange={handleChange}
				required
			/>
		</>
	);
};