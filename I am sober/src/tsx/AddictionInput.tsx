import { ChangeEvent } from 'react';
import { StyledInput } from '../styles/StyledInput';



export const AddictionInput: React.FC = () => {
	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setUserData((prevState) => ({
	// 		...prevState,
	// 		addictionType: e.target.value,
	// 	}));
	// };
	return (
		<>
			<label htmlFor="addiction-choice'">Od czego jesteś uzależniony</label>
			<StyledInput
				id='addiction-choice'
				list='Addiction-type'
				// value={value}
				// onChange={handleChange}
				required
			/>
			<datalist id='Addiction-type'>
				<option value='Alkohol' />
				<option value='Narkotyki' />
				<option value='Pornografia' />
				<option value='Hazard' />
			</datalist>
		</>
	);
};
